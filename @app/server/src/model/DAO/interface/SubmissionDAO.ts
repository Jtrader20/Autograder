import { Submission, SubmissionStatAvg, SubmissionStatGauge, SubmissionStatTime } from "@autograder/shared";

export interface SubmissionDAO {
    createSubmission(submission: Submission): Promise<void>
    readSubmissionsByAssignmentWithAlias(alias: string, assignmentid: string): Promise<Submission[]>
    readSubmissionsByAssignment(assignmentid: string): Promise<Submission[]>
    readSubmissionNumberByAssignmentWithAlias(alias: string, assignmentid: string): Promise<number>
    readSubmissionStatsByDateAndAssignment(startdate: number, enddate: number, assignmentid: string): Promise<SubmissionStatTime[]>
    readSubmissionStatsByAssignment(assignmentid: string, earlydate: number, latedate: number): Promise<SubmissionStatGauge[]>
    readSubmissionStatsAvgByAssignment(assignmentid: string): Promise<SubmissionStatAvg>
}