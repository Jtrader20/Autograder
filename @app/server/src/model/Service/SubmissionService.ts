import { Submission, SubmissionDTO, SubmissionStatAvg, SubmissionStatGauge, SubmissionStatGaugeDTO, SubmissionStatTime, SubmissionStatTimeDTO } from "@autograder/shared";
import { Service } from "./Service";

export class SubmissionService extends Service {

    public async getSubmissionDetails (token: string, alias: string, assignmentid: string): Promise<SubmissionDTO[]> {
        return this.fetchAndTransform<Submission, SubmissionDTO>(token, alias, false, () => this.SubmissionDAO.readSubmissionsByAssignmentWithAlias(alias, assignmentid), (sub) => sub.DTO)
    }

    public async getNumberOfSubmissions(token: string, alias: string, assignmentid: string): Promise<number> {
        return await this.secureOperation<number>(token, alias, false, async () => {
            return await this.SubmissionDAO.readSubmissionNumberByAssignmentWithAlias(alias, assignmentid)
        })
    }

    public async getSubmissionStatTime(token: string, alias: string, startdate: number, enddate: number, assignmentid: string): Promise<SubmissionStatTimeDTO[]> {
        return this.fetchAndTransform<SubmissionStatTime, SubmissionStatTimeDTO>(token, alias, true, () => this.SubmissionDAO.readSubmissionStatsByDateAndAssignment(startdate, enddate, assignmentid), (stat) => stat.DTO)
    }

    public async getSubmissionStatGauge(token: string, alias: string, assignmentid: string, daybefore: number, duedate: number): Promise<SubmissionStatGaugeDTO[]> {
        return this.fetchAndTransform<SubmissionStatGauge, SubmissionStatGaugeDTO>(token, alias, true, () => this.SubmissionDAO.readSubmissionStatsByAssignment(assignmentid, daybefore, duedate), (stat) => stat.DTO)
    }

    public async saveSubmission(submission: Submission, token: string, alias: string): Promise<void> {
        return await this.secureOperation<void>(token, alias, false, async () => {
            await this.SubmissionDAO.createSubmission(submission)
        })
    }

    public async getSubmissionStatAvg(token: string, alias: string, assignmentid: string): Promise<SubmissionStatAvg> {
        return await this.secureOperation<SubmissionStatAvg>(token, alias, true, async () => {
            return await this.SubmissionDAO.readSubmissionStatsAvgByAssignment(assignmentid)
        })
    }
}