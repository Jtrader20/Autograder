import { UserAssignment } from "@autograder/shared";
import { UserAssignmentDAO } from "../interface/UserAssignmentDAO";
import { DB } from "./database/SQLDatabase";
import { RowDataPacket } from "mysql2";
import { format } from "date-fns";

export class UserAssignmentDAOImp implements UserAssignmentDAO {
    public async createUserAssignment(userassignment: UserAssignment): Promise<void> {
        return await DB.databaseOperation<void>( async (connection) => {
            const SQL = `
                INSERT INTO UserAssignment (alias, assignmentid, scoreearned, maxscore, gracedaysearned, gracedaysused, modifieddate, creditreceived, submitrange)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `
            const { alias, assignmentid, scoreearned, maxscore, gracedaysearned, gracedaysused, modifieddate, creditreceived, submitrange } = userassignment
            const formatteddate = format(new Date(modifieddate), 'yyyy-MM-dd HH:mm:ss')
            await connection.execute<RowDataPacket[]>(SQL, [alias, assignmentid, scoreearned, maxscore, gracedaysearned, gracedaysused, formatteddate, creditreceived, submitrange])
        })
    }

    public async readUserAssignments(): Promise<UserAssignment[]> {
        return await DB.databaseOperation<UserAssignment[]>( async (connection) => {
            const SQL = `
                SELECT *
                FROM UserAssignment
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL)

            return this.aggregateUserAssignments(rows)
        })
    }

    public async readUserAssignmentsByAlias(alias: string): Promise<UserAssignment[]> {
        return await DB.databaseOperation<UserAssignment[]>( async (connection) => {
            const SQL = `
                SELECT *
                FROM UserAssignment
                WHERE alias = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [alias])

            return this.aggregateUserAssignments(rows)
        })
    }

    private aggregateUserAssignments(rows: RowDataPacket[]): UserAssignment[] {
        const userassignments: UserAssignment[] = []
        if (Array.isArray(rows) && rows.length > 0) {
            rows.forEach((row) => {
                const { alias, assignmentid, scoreEarned, maxScore, graceDaysEarned, graceDaysUsed, modifiedDate, creditReceived, submitRange } = row
                const userassignment = new UserAssignment(alias, assignmentid, scoreEarned, maxScore, graceDaysEarned, graceDaysUsed, modifiedDate, creditReceived, submitRange)
                userassignments.push(userassignment)
            })
        }
        return userassignments
    }

    public async readUserAssignmentsByAssignment(assignmentid: string): Promise<UserAssignment[]> {
        return await DB.databaseOperation<UserAssignment[]> ( async (connection) => {
            const SQL = `
                SELECT *
                FROM UserAssignment
                WHERE assignmentid = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [assignmentid])

            return this.aggregateUserAssignments(rows)
        })
    }

    public async readUserAssignmentByAliasAssignment(alias: string, assignmentid: string): Promise<UserAssignment | null> {
        return await DB.databaseOperation<UserAssignment | null> ( async (connection) => {
            const SQL = `
                SELECT *
                FROM UserAssignment
                WHERE alias = ? AND assignmentid = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [alias, assignmentid])

            if (Array.isArray(rows) && rows.length > 0) {
                const { alias, assignmentid, scoreEarned, maxScore, graceDaysEarned, graceDaysUsed, modifiedDate, creditReceived, submitRange } = rows[0]
                return new UserAssignment(alias, assignmentid, scoreEarned, maxScore, graceDaysEarned, graceDaysUsed, modifiedDate, creditReceived, submitRange)
            }

            return null
        })
    }

    public async updateUserAssignment(userassignment: UserAssignment): Promise<void> {
        return await DB.databaseOperation<void>(async (connection) => {
            const SQL = `
                UPDATE UserAssignment
                SET scoreearned = ?, maxscore = ?, gracedaysearned = ?, gracedaysused = ?, modifieddate = ?, creditreceived = ?, submitrange = ?
                WHERE alias = ? AND assignmentid = ?
            `;
            const { alias, assignmentid, scoreearned, maxscore, gracedaysearned, gracedaysused, modifieddate, creditreceived, submitrange } = userassignment;
            await connection.execute<RowDataPacket[]>(SQL, [scoreearned, maxscore, gracedaysearned, gracedaysused, modifieddate, creditreceived, submitrange, alias, assignmentid]);
        });
    }
}