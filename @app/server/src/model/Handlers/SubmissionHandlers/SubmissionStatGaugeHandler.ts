import { Request, Response } from "express";
import { generalHandler } from "../GeneralHandler";
import { SubmissionService } from "../../Service/SubmissionService";
import { SQLFactory } from "../../DAO/factory/SQLFactory";
import { AssignmentService } from "../../Service/AssignmentService";
import { Assignment, SubmissionRequest,  SubmissionStatGaugeDTO, SubmissionStatGaugeResponse } from "@autograder/shared";

const SubmissionStatGaugeHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: SubmissionRequest = req.body
        const assignmentservice = new AssignmentService(SQLFactory.getInstance())
        const assignment: Assignment = await assignmentservice.getAssignment(request.authToken, request.alias, request.assignmentid)
        const duedate: number = assignment.dueDate
        const earlydate: number = duedate - (24 * 60 * 60 * 1000);
        const latedate: number = duedate + (24 * 60 * 60 * 1000);
        const submissionservice = new SubmissionService(SQLFactory.getInstance())
        const submissionstatDTO: SubmissionStatGaugeDTO[] = await submissionservice.getSubmissionStatGauge(request.authToken, request.alias, request.assignmentid, earlydate, latedate)
        const response: SubmissionStatGaugeResponse = {
            SubmissionStatGauge: submissionstatDTO
        }
        res.json(response)
    })
}

export default SubmissionStatGaugeHandler