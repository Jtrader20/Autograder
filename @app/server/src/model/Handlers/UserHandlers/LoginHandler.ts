import { Request, Response } from "express";
import { generalHandler } from "../GeneralHandler";
import { AuthResponse, AuthToken, LoginRequest, Role, User } from "@autograder/shared";
import { UserService } from "../../Service/UserService";
import { SQLFactory } from "../../DAO/factory/SQLFactory";

const LoginHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: LoginRequest = req.body
        const userservice: UserService = new UserService(SQLFactory.getInstance())
        const [user, token, role]: [User, AuthToken, Role] = await userservice.login(request.alias, request.password)
        const response: AuthResponse = {
            UserDTO: user.DTO,
            AuthtokenDTO: token.DTO,
            RoleDTO: role.DTO
        }
        res.json(response)
    })
}

export default LoginHandler