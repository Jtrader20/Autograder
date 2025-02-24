import { DAOFactory } from "../DAO/factory/DAOFactory";
import { AuthDAO } from "../DAO/interface/AuthDAO";
import { RoleDAO } from "../DAO/interface/RoleDAO";
import { UserDAO } from "../DAO/interface/UserDAO";

export class Service {

    protected UserDAO: UserDAO
    protected AuthDAO: AuthDAO
    protected RoleDAO: RoleDAO

    constructor(factory: DAOFactory) {
        this.UserDAO = factory.createUserDAO()
        this.AuthDAO = factory.createAuthDAO()
        this.RoleDAO = factory.createRoleDAO()
    }

    private async validateToken(token: string): Promise<boolean> {
        return await this.AuthDAO.readAuthToken(token)
    }

    public async validatedOperation<T> (token: string, operation: () => Promise<T>): Promise<T> {
        if (await this.validateToken(token)) {
            return await operation()
        } else {
            throw new Error("[Bad Request] Invalid token")
        }
    }
}