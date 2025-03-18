import { Request, Response } from "express";
import { generalHandler } from "../GeneralHandler";
import { UserAssignmentDTO, UserAssignmentsResponse, UserRequest } from "@autograder/shared";
import { UserAssignmentService } from "../../Service/UserAssignmentService";
import { SQLFactory } from "../../DAO/factory/SQLFactory";

const AllUserAssignmentsHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: UserRequest = req.body
        const userassignmentservice: UserAssignmentService = new UserAssignmentService(SQLFactory.getInstance())
        const userassignments: UserAssignmentDTO[] = await userassignmentservice.getAllUserAssignments(request.authToken, request.alias)
        const response: UserAssignmentsResponse = {
            UserAssignments: userassignments
        }
        res.json(response)
    })
}

export default AllUserAssignmentsHandler