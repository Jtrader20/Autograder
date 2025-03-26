import { AuthToken, Role, RoleTypes } from "@autograder/shared";
import { DAOFactory } from "../DAO/factory/DAOFactory";
import { AssignmentDAO } from "../DAO/interface/AssignmentDAO";
import { AuthDAO } from "../DAO/interface/AuthDAO";
import { RoleDAO } from "../DAO/interface/RoleDAO";
import { UserDAO } from "../DAO/interface/UserDAO";
import { SubmissionDAO } from "../DAO/interface/SubmissionDAO";
import { UserAssignmentDAO } from "../DAO/interface/UserAssignmentDAO";

type RolePolicy = (roles: RoleTypes[]) => boolean;

export class Service {
    protected UserDAO: UserDAO;
    protected AuthDAO: AuthDAO;
    protected RoleDAO: RoleDAO;
    protected AssignmentDAO: AssignmentDAO;
    protected SubmissionDAO: SubmissionDAO
    protected UserAssignmentDAO: UserAssignmentDAO

    constructor(factory: DAOFactory) {
        this.UserDAO = factory.createUserDAO();
        this.AuthDAO = factory.createAuthDAO();
        this.RoleDAO = factory.createRoleDAO();
        this.AssignmentDAO = factory.createAssignmentDAO()
        this.SubmissionDAO = factory.createSubmissionDAO()
        this.UserAssignmentDAO = factory.createUserAssignmentDAO()
    }

    protected timeout: number = 15 * 60 * 1000

    protected AdminPolicy: RolePolicy = (roles) => roles.includes(RoleTypes.ADMIN);

    private async changeToken(auth: AuthToken): Promise<boolean> {
        const timestamp = new Date(auth.token).getTime()
        const now = new Date().getTime()
        if (timestamp - now > this.timeout) {
            await this.AuthDAO.deleteAuthToken(auth.token)
            return false
        }
        const updatedtimestamp = new Date(now + this.timeout).getTime()
        await this.AuthDAO.updateTimestamp(auth.token, updatedtimestamp)
        return true 
    }

    private async validateToken(token: string): Promise<boolean> {
        const auth =  await this.AuthDAO.readAuthToken(token);
        if (!auth) return false
        return await this.changeToken(auth)
    }

    private async userMatchesToken(token: string, alias: string): Promise<boolean> {
        const auth =  await this.AuthDAO.readAuthTokenWithAlias(token, alias);
        if (!auth) return false
        return await this.changeToken(auth)
    }

    protected async hasRole(alias: string, policy: RolePolicy): Promise<boolean> {
        const userRoles: Role | null = await this.RoleDAO.readRolesByAlias(alias);
        return userRoles ? policy(userRoles.roles) : false;
    }

    public async validatedOperation<T>(token: string, operation: () => Promise<T>): Promise<T> {
        if (!await this.validateToken(token)) throw new Error("[Bad Request] Invalid token");
        return await operation();
    }

    public async secureOperation<T>(token: string, alias: string, admin: boolean, operation: () => Promise<T>): Promise<T> {
        if (!await this.validateToken(token)) throw new Error("[Bad Request] Invalid token");
        if (!await this.userMatchesToken(token, alias)) throw new Error("[Bad Request] Invalid user operation");
        if (admin && !await this.hasRole(alias, this.AdminPolicy)) throw new Error("[Bad Request] Access Denied");
        return await operation();
    }

    public async fetchAndTransform<T, DTO>(token: string, alias: string, secure: boolean, fetchFn: () => Promise<T[]>, transformFn: (item: T) => DTO): Promise<DTO[]> {
        return await this.secureOperation<DTO[]>(token, alias, secure, async () => {
            const items: T[] = await fetchFn()
            return items.map(transformFn)
        })
    }
}
