import { Request, Response } from "express";
import { generalHandler } from "../GeneralHandler";
import { UserDTO, UserListResponse, UserRequest } from "@autograder/shared";
import { UserService } from "../../Service/UserService";
import { SQLFactory } from "../../DAO/factory/SQLFactory";

const UserListHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: UserRequest = req.body
        const userservice: UserService = new UserService(SQLFactory.getInstance())
        const userDTO: UserDTO[] = await userservice.getuserlist(request.authToken, request.alias)
        const response: UserListResponse = {
            UserList: userDTO
        }

        res.json(response)
    })
}

export default UserListHandler