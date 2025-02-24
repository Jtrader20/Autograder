import { Request, Response } from "express"
import { SQLFactory } from "../../DAO/factory/SQLFactory"
import { UserService } from "../../Service/UserService"
import { RegisterRequest, User, AuthToken, Role, AuthResponse } from "@autograder/shared"
import { generalHandler } from "../GeneralHandler"


const RegisterHandler = async (req: Request, res: Response): Promise<void> => {
    generalHandler(res, async () => {
        const request: RegisterRequest = req.body
        const userservice: UserService = new UserService(SQLFactory.getInstance())
        const [user, token, role]: [User, AuthToken, Role] = await userservice.register(request.alias, request.firstName, request.lastName, request.password);
        const response: AuthResponse = {
            UserDTO: user.DTO,
            AuthtokenDTO: token.DTO,
            RoleDTO: role.DTO
        }
        res.json(response)
    })
}

export default RegisterHandler
