import { Request, Response } from "express";
import { SubmissionStatTimeDTO, SubmissionStatTimeRequest, SubmissionStatTimeResponse } from "@autograder/shared"
import { SQLFactory } from "../../DAO/factory/SQLFactory"
import { SubmissionService } from "../../Service/SubmissionService"
import { generalHandler } from "../GeneralHandler"

const SubmissionStatTimeHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: SubmissionStatTimeRequest = req.body
        const submissionservice = new SubmissionService(SQLFactory.getInstance())
        const submissionstatDTO: SubmissionStatTimeDTO[] = await submissionservice.getSubmissionStatTime(request.authToken, request.alias, request.startdate, request.enddate, request.assignmentid)
        const response: SubmissionStatTimeResponse = {
            SubmissionStatTime: submissionstatDTO
        }
        res.json(response)
    })
}

export default SubmissionStatTimeHandler