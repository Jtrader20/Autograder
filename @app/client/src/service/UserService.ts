import { User, AuthToken, Role, RegisterRequest, AuthRequest, LoginRequest, UserDTO, UserRequest } from "@autograder/shared";
import { Service } from "./Service";


export class UserService extends Service {
    public async login(alias: string, password: string): Promise<[User, AuthToken, Role]> {
        const request: LoginRequest = {
            alias,
            password
        }

        return this.facade.login(request)
    }

    public async register(firstName: string, lastName: string, alias: string, password: string): Promise<[User, AuthToken, Role]> {
        const request: RegisterRequest = {
            firstName,
            lastName,
            alias,
            password
        }

        return this.facade.register(request)
    }

    public async logout(authToken: string): Promise<void> {
        const request: AuthRequest = {
            authToken
        }

        return this.facade.logout(request)
    }

    public async getUserList(authToken: string, alias: string): Promise<User[]> {
        const request: UserRequest = {
            alias,
            authToken
        }

        return this.facade.getUserList(request)
    }
}