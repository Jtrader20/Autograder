import { User, AuthToken, Role, UserDTO } from "@autograder/shared";
import { Service } from "./Service";
import bcrypt from 'bcryptjs'
import { StatusTypes } from "../Handlers/GeneralHandler";

export class UserService extends Service {
    public async getUserLateDaysRemaining (alias: string, token: string): Promise<number> {
        return await this.secureOperation(token, alias, false, async () => {
            const user: User | null = await this.UserDAO.readUserByAlias(alias)
            if (!user) throw new Error(`[${StatusTypes.SERVER_ERROR}] User does not exist`)
            return user.graceDays
        })
    }

    public async addGraceDays(alias: string, token: string, daystoadd: number): Promise<void> {
        return await this.secureOperation(token, alias, false, async () => {
            const currentgracedays = await this.getUserLateDaysRemaining(alias, token)
            const newgracedaynumber = currentgracedays + daystoadd
            await this.UserDAO.updateUserGraceDays(alias, newgracedaynumber)
        })
    }

    public async deductGraceDays(alias: string, token: string, daystodeduct: number): Promise<void> {
        return await this.secureOperation(token, alias, false, async () => {
            const currentgracedays = await this.getUserLateDaysRemaining(alias, token)
            const newgracedaynumber = currentgracedays - daystodeduct
            await this.UserDAO.updateUserGraceDays(alias, newgracedaynumber)
        })
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    }
    
    public async register (alias: string, firstName: string, lastName: string, password: string): Promise<[User, AuthToken, Role]> {
        const DBuser: User | null = await this.UserDAO.readUserByAlias(alias)

        if (DBuser) throw new Error(`[${StatusTypes.BAD_REQUEST}] Invalid registration`)

        const hashedPassword = await this.hashPassword(password)

        const user: User = await this.UserDAO.createUser(alias, firstName, lastName, hashedPassword)
        const auth: AuthToken = await this.AuthDAO.createAuthToken(alias)
        const role: Role = await this.RoleDAO.createRole(alias)

        return [user, auth, role]
    }

    public async login (alias: string, password: string): Promise<[User, AuthToken, Role]> {
        const user: User | null = await this.UserDAO.readUserByAliasPassword(alias, password)

        if (user == null) {
            throw new Error(`[${StatusTypes.BAD_REQUEST}] Invalid credentials`)
        }

        const auth: AuthToken = await this.AuthDAO.createAuthToken(alias)
        const role: Role | null = await this.RoleDAO.readRolesByAlias(alias)

        if (!role) throw new Error(`[${StatusTypes.BAD_REQUEST}] User has no valid role`)

        return [user, auth, role]
    }

    public async getuserlist(token: string, alias: string): Promise<UserDTO[]> {
        return this.fetchAndTransform<User, UserDTO>(token, alias, true, async () => this.UserDAO.readUsers(), (user) => user.DTO)
    }

    public async logout (token: string): Promise<void> {
        this.validatedOperation(token, async () => {
            await this.AuthDAO.deleteAuthToken(token)
        })
    }
}