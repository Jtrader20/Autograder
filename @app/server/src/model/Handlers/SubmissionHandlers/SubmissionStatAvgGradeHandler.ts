import { Request, Response } from "express";
import { generalHandler } from "../GeneralHandler";
import { SubmissionRequest, SubmissionStatAvg, SubmissionStatAvgResponse } from "@autograder/shared";
import { SubmissionService } from "../../Service/SubmissionService";
import { SQLFactory } from "../../DAO/factory/SQLFactory";

const SubmissionStatAvgHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: SubmissionRequest = req.body
        const submissionservice = new SubmissionService(SQLFactory.getInstance())
        const submissionstat: SubmissionStatAvg = await submissionservice.getSubmissionStatAvg(request.authToken, request.alias, request.assignmentid)
        const response: SubmissionStatAvgResponse = {
            SubmissionStatAvg: submissionstat.DTO
        }
        res.json(response)
    })
}

export default SubmissionStatAvgHandler