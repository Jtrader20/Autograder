import { ClientCommunicator } from "./ClientCommunicator";
import config from '../config'
import { RegisterRequest, User, AuthToken, Role, AuthResponse, AuthRequest, AutograderResponse, LoginRequest } from "@autograder/shared";



export class ServerFacade {
    private SERVER_URL = config.path
    private clientCommunicator = new ClientCommunicator(this.SERVER_URL)

    public async register(request: RegisterRequest): Promise<[User, AuthToken, Role]> {
        const response = await this.clientCommunicator.doPost<RegisterRequest, AuthResponse>(request, '/api/auth')

        const user: User = User.fromDTO(response.UserDTO)
        const auth: AuthToken = AuthToken.fromDTO(response.AuthtokenDTO)
        const role: Role = Role.fromDTO(response.RoleDTO)

        return [user, auth, role]
    }

    public async login(request: LoginRequest): Promise<[User, AuthToken, Role]> {
        const response = await this.clientCommunicator.doPut<LoginRequest, AuthResponse>(request, '/api/auth')

        const user: User = User.fromDTO(response.UserDTO)
        const auth: AuthToken = AuthToken.fromDTO(response.AuthtokenDTO)
        const role: Role = Role.fromDTO(response.RoleDTO)

        return [user, auth, role]   
    }

    public async logout(request: AuthRequest): Promise<void> {
        await this.clientCommunicator.doDelete<AuthRequest, AutograderResponse>(request, '/api/auth')
    }
}