import { Submission, SubmissionRequest, SubmissionStatAvg, SubmissionStatGauge, SubmissionStatTime, SubmissionStatTimeRequest } from "@autograder/shared";
import { Service } from "./Service";

export class SubmissionService extends Service {
    public async getSubmissionDetails(authToken: string, alias: string, assignmentid: string): Promise<Submission[]> {
        const request: SubmissionRequest = {
            authToken,
            alias,
            assignmentid
        }

        return this.facade.getSubmissionDetails(request)
    }

    public async getSubmissionStatsTime(authToken: string, alias: string, assignmentid: string, startdate: number, enddate: number): Promise<SubmissionStatTime[]> {
        const request: SubmissionStatTimeRequest = {
            authToken,
            alias,
            assignmentid,
            startdate,
            enddate
        }

        return this.facade.getSubmissionStatsTime(request)
    }

    public async getSubmissionStatsGauge(authToken: string, alias: string, assignmentid: string): Promise<SubmissionStatGauge[]> {
        const request: SubmissionRequest = {
            authToken,
            alias,
            assignmentid
        }

        return this.facade.getSubmissionStatsGauge(request)
    }

    public async getSubmissionStatsAvgGrade(authToken: string, alias: string, assignmentid: string): Promise<SubmissionStatAvg> {
        const request: SubmissionRequest = {
            authToken,
            alias,
            assignmentid
        }
        
        return this.facade.getSubmissionStatsAvgGrade(request)
    }
}