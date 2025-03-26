import { Request, Response } from "express";
import { generalHandler } from "../GeneralHandler";
import { UserService } from "../../Service/UserService";
import { SQLFactory } from "../../DAO/factory/SQLFactory";
import { GraceDaysRequest } from "@autograder/shared";

const GraceDaysUpdateHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: GraceDaysRequest = req.body
        const userservice: UserService = new UserService(SQLFactory.getInstance())
        await userservice.setGraceDays(request.admin, request.authToken, request.user, request.gracedays)
        res.send({})
    })
}

export default GraceDaysUpdateHandler