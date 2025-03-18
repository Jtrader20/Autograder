import { Request, Response } from "express";
import { generalHandler } from "../GeneralHandler";
import { SubmissionDTO, SubmissionRequest, SubmissionResponse } from "@autograder/shared";
import { SQLFactory } from "../../DAO/factory/SQLFactory";
import { SubmissionService } from "../../Service/SubmissionService";

const SubmissionHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: SubmissionRequest = req.body
        const submissionservice: SubmissionService = new SubmissionService(SQLFactory.getInstance())
        const submissionDTO: SubmissionDTO[] = await submissionservice.getSubmissionDetails(request.authToken, request.alias, request.assignmentid)
        const response: SubmissionResponse = {
            Submissions: submissionDTO
        }
        res.json(response)
    })
}

export default SubmissionHandler