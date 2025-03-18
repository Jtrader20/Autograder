import { Submission, SubmissionStatAvg, SubmissionStatGauge, SubmissionStatTime } from "@autograder/shared";
import { SubmissionDAO } from "../interface/SubmissionDAO";
import { RowDataPacket } from "mysql2";
import { DB } from "./database/SQLDatabase";
import { format } from "date-fns";

export class SubmissionDAOImp implements SubmissionDAO {
    public async createSubmission(submission: Submission): Promise<void> {
        return await DB.databaseOperation<void>( async (connection) => {
            const SQL = `
                INSERT INTO Submission (alias, title, assignmentid, submissionTime, scoreEarned, scoreTotal, duration, status, tasks) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `
            const formatteddate = format(new Date(submission.submissionTime), 'yyyy-MM-dd HH:mm:ss')
            await connection.execute<RowDataPacket[]>(SQL, [submission.alias, submission.title, submission.assignmentid, formatteddate, submission.scoreEarned, submission.scoreTotal, submission.duration, submission.status, JSON.stringify(submission.tasks)])
        })
    }

    public async readSubmissionsByAssignment(assignmentid: string): Promise<Submission[]> {
        return await DB.databaseOperation<Submission[]>( async (connection) => {
            const SQL = `
                SELECT * 
                FROM Submission 
                WHERE assignmentid = ?
            `
            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [assignmentid])
            const submissions: Submission[] = []

            if (Array.isArray(rows) && rows.length > 0) {
                rows.forEach((row) => {
                    const { alias, assignmentid, title, scoreEarned, scoreTotal, submissionTime, duration, status, tasks } = row
                    const parsedTasks = typeof tasks === "string" ? JSON.parse(tasks) : tasks;
                    const submission = new Submission(alias, assignmentid, title, scoreEarned, scoreTotal, submissionTime, duration, status, parsedTasks)
                    submissions.push(submission)
                })
            }

            return submissions
        })
    }

    public async readSubmissionsByAssignmentWithAlias(alias: string, assignmentid: string): Promise<Submission[]> {
        return await DB.databaseOperation<Submission[]>( async (connection) => {
            const SQL = `
                SELECT * 
                FROM Submission
                WHERE assignmentid = ? AND alias = ?
            `
            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [assignmentid, alias])
            const submissions: Submission[] = []

            if (Array.isArray(rows) && rows.length > 0) {
                rows.forEach((row) => {
                    const { alias, assignmentid, title, scoreEarned, scoreTotal, submissionTime, duration, status, tasks } = row
                    const parsedTasks = typeof tasks === "string" ? JSON.parse(tasks) : tasks;
                    const submission = new Submission(alias, assignmentid, title, scoreEarned, scoreTotal, submissionTime, duration, status, parsedTasks)
                    submissions.push(submission)
                })
            }

            return submissions
        })
    }

    public async readSubmissionNumberByAssignmentWithAlias(alias: string, assignmentid: string): Promise<number> {
        return await DB.databaseOperation<number>( async (connection) => {
            const SQL = `
                SELECT COUNT(*) AS submissionCount
                FROM Submission
                WHERE assignmentid = ? AND alias = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [assignmentid, alias])

            return rows[0]?.submissionCount || 0
        })
    }

    public async readSubmissionStatsAvgByAssignment(assignmentid: string): Promise<SubmissionStatAvg> {
        return await DB.databaseOperation<SubmissionStatAvg>(async (connection) => {
            const SQL = `
                WITH AllStudents AS (
                    -- Get all students with role 'USER'
                    SELECT u.alias 
                    FROM User u
                    JOIN UserRole ur ON u.alias = ur.alias
                    WHERE ur.role = 'USER'
                ),
                RankedSubmissions AS (
                    -- Rank submissions by highest score, preferring the latest in case of a tie
                    SELECT 
                        alias,
                        scoreEarned,
                        scoreTotal
                    FROM (
                        SELECT 
                            alias,
                            scoreEarned,
                            scoreTotal,
                            RANK() OVER (PARTITION BY alias ORDER BY scoreEarned DESC, submissionTime DESC) AS submission_rank
                        FROM Submission
                        WHERE assignmentid = ?
                    ) AS ranked
                    WHERE submission_rank = 1
                ),
                AverageSubmitted AS (
                    -- Compute the average score for students who submitted
                    SELECT AVG(scoreEarned / NULLIF(scoreTotal, 0)) AS avgSubmitted
                    FROM RankedSubmissions
                ),
                AverageAll AS (
                    -- Compute the average score including non-submitters (treat them as 0)
                    SELECT AVG(COALESCE(rs.scoreEarned / NULLIF(rs.scoreTotal, 0), 0)) AS avgAll
                    FROM AllStudents a
                    LEFT JOIN RankedSubmissions rs ON a.alias = rs.alias
                )
                SELECT 
                    (SELECT avgSubmitted FROM AverageSubmitted) AS avgSubmitted,
                    (SELECT avgAll FROM AverageAll) AS avgAll;
            `;
    
            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [assignmentid]);

            if (Array.isArray(rows) && rows.length > 0) {
                const { avgSubmitted, avgAll } = rows[0]
                return new SubmissionStatAvg(avgSubmitted ?? 0, avgAll ?? 0)
            } else {
                return new SubmissionStatAvg(0, 0)
            }
            
        });
    }
    

    public async readSubmissionStatsByAssignment(assignmentid: string, earlydate: number, latedate: number): Promise<SubmissionStatGauge[]> {
        return await DB.databaseOperation<SubmissionStatGauge[]>( async (connection) => {
            earlydate = new Date(earlydate).getTime()
            latedate = new Date(latedate).getTime()
            const SQL = `
                WITH AllStudents AS (
                    -- Get all students with role 'USER'
                    SELECT u.alias 
                    FROM User u
                    JOIN UserRole ur ON u.alias = ur.alias
                    WHERE ur.role = 'USER'
                ),
                RankedSubmissions AS (
                    -- Rank submissions by highest score, preferring earlier ones in case of a tie
                    SELECT 
                        alias,
                        submissionTime,
                        scoreEarned,
                        scoreTotal,
                        RANK() OVER (PARTITION BY alias ORDER BY scoreEarned DESC, submissionTime ASC) AS submission_rank
                    FROM Submission
                    WHERE assignmentid = ?
                ),
                Categorized AS (
                    -- Select only the highest-scoring submission per student and categorize it
                    SELECT 
                        alias,
                        CASE 
                            WHEN submissionTime < FROM_UNIXTIME(? / 1000) AND scoreEarned >= scoreTotal THEN 'early' -- Early boundary
                            WHEN submissionTime < FROM_UNIXTIME(? / 1000) AND scoreEarned < scoreTotal OR submissionTime >= FROM_UNIXTIME(? / 1000) AND submissionTime < FROM_UNIXTIME(? / 1000)THEN 'ontime' -- On-time window
                            WHEN submissionTime > FROM_UNIXTIME(? / 1000) THEN 'late' -- Late boundary
                            ELSE 'late'
                        END AS category
                    FROM RankedSubmissions
                    WHERE submission_rank = 1
                ),
                FinalCounts AS (
                    -- Count students in each submission category
                    SELECT category, COUNT(DISTINCT alias) AS studentcount
                    FROM Categorized
                    GROUP BY category
                    UNION ALL
                    -- Count students who never submitted anything
                    SELECT 'no_submission' AS category, COUNT(DISTINCT a.alias) AS studentcount
                    FROM AllStudents a
                    LEFT JOIN Submission s ON a.alias = s.alias AND s.assignmentid = ?
                    WHERE s.alias IS NULL
                )
                -- Return the final count of students per category
                SELECT category, studentcount FROM FinalCounts;
            `;


            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [assignmentid, earlydate, earlydate, earlydate, latedate, latedate, assignmentid])
            
            const stats: SubmissionStatGauge[] = []

            if (Array.isArray(rows) && rows.length > 0) {
                rows.forEach((row) => {
                    const { category, studentcount } = row
                    const stat = new SubmissionStatGauge(category, studentcount)
                    stats.push(stat)
                })
            }

            return stats
        })

    }

    public async readSubmissionStatsByDateAndAssignment(startdate: number, enddate: number, assignmentid: string): Promise<SubmissionStatTime[]> {
        return await DB.databaseOperation<SubmissionStatTime[]>( async (connection) => {
            const SQL = `
                SELECT
                    DATE(submissionTime) AS submission_date,
                    SUM(CASE 
                        WHEN scoreEarned >= scoreTotal THEN 1 
                        ELSE 0 
                    END) AS full_credit,
                    SUM(CASE 
                        WHEN scoreEarned < scoreTotal AND scoreEarned > 0 THEN 1 
                        ELSE 0 
                    END) AS partial_credit,
                    SUM(CASE 
                        WHEN scoreEarned = 0 THEN 1 
                        ELSE 0 
                    END) AS no_credit
                FROM Submission
                WHERE submissionTime BETWEEN FROM_UNIXTIME(? / 1000) AND FROM_UNIXTIME(? / 1000)
                    AND assignmentid = ?
                GROUP BY DATE(submissionTime)
                ORDER BY submission_date
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [startdate, enddate, assignmentid])

            const stats: SubmissionStatTime[] = []

            if (Array.isArray(rows) && rows.length > 0) {
                rows.forEach((row) => {
                    const {submission_date, full_credit, partial_credit, no_credit} = row
                    const stat = new SubmissionStatTime(full_credit, partial_credit, no_credit, submission_date)
                    stats.push(stat)
                })
            }

            return stats
        })
    }
}