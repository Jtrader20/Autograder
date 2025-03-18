import { Request, Response } from "express";
import { generalHandler } from "../GeneralHandler";
import { AssignmentDTO, AssignmentResponse, AuthRequest } from "@autograder/shared";
import { AssignmentService } from "../../Service/AssignmentService";
import { SQLFactory } from "../../DAO/factory/SQLFactory";

const AssignmentHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: AuthRequest = req.body
        const assingmentservice: AssignmentService = new AssignmentService(SQLFactory.getInstance())
        const assignmentDTO: AssignmentDTO[] = await assingmentservice.getAssignmemtDetails(request.authToken)
        const response: AssignmentResponse = {
            Assignments: assignmentDTO
        }
        res.json(response)
    })
}

export default AssignmentHandler