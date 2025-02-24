import { Role } from "@autograder/shared"
import { RoleDAO } from "../interface/RoleDAO";
import { DB } from "./database/SQLDatabase";

enum Roles {
    USER = "USER",
    ADMIN = "ADMIN"
}

export class RoleDAOImp implements RoleDAO {
    async createRole(alias: string): Promise<Role> {
        return await DB.databaseOperation<Role>( async (connection) => {
            const SQL = `
                INSERT INTO UserRole (alias, role)
                VALUES (?, ?)
            `

            await connection.execute(SQL, [alias, Roles.USER])
            await connection.execute(SQL, [alias, Roles.ADMIN])

            const RoleArray: string[] = [Roles.USER, Roles.ADMIN]
            return new Role(RoleArray)
        })
    }
}