import { Request, Response } from "express";
import { generalHandler } from "../GeneralHandler";
import { AuthRequest } from "@autograder/shared";
import { UserService } from "../../Service/UserService";
import { SQLFactory } from "../../DAO/factory/SQLFactory";

const LogoutHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: AuthRequest = req.body
        const userservice: UserService = new UserService(SQLFactory.getInstance())
        await userservice.logout(request.authToken)
        res.status(200).json({})
    })
}

export default LogoutHandler