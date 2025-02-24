import { User, AuthToken, Role } from "@autograder/shared";
import { Service } from "./Service";
import bcrypt from 'bcryptjs'
import { StatusTypes } from "../Handlers/GeneralHandler";

export class UserService extends Service {
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    }
    
    public async register (alias: string, firstName: string, lastName: string, password: string): Promise<[User, AuthToken, Role]> {
        const DBuser: User | null = await this.UserDAO.readUserByAlias(alias)

        if (DBuser) {
            throw new Error(`[${StatusTypes.BAD_REQUEST}] Invalid registration`)
        }

        const hashedPassword = await this.hashPassword(password)

        const user: User = await this.UserDAO.createUser(alias, firstName, lastName, hashedPassword)
        const auth: AuthToken = await this.AuthDAO.createAuthToken(alias)
        const role: Role = await this.RoleDAO.createRole(alias)

        return [user, auth, role]
    }

    public async login (alias: string, password: string): Promise<[User, AuthToken, Role]> {
        console.log('login service')
        const user: User | null = await this.UserDAO.readUserByAliasPassword(alias, password)

        if (user == null) {
            throw new Error(`[${StatusTypes.BAD_REQUEST}] Invalid credentials`)
        }

        const auth: AuthToken = await this.AuthDAO.createAuthToken(alias)
        const role: Role = await this.RoleDAO.createRole(alias)

        return [user, auth, role]
    }

    public async logout (token: string): Promise<void> {
        this.validatedOperation(token, async () => {
            await this.AuthDAO.deleteAuthToken(token)
        })
    }
}