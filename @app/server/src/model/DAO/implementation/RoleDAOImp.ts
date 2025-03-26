import { Role, RoleTypes } from "@autograder/shared"
import { RoleDAO } from "../interface/RoleDAO";
import { DB } from "./database/SQLDatabase";
import { RowDataPacket } from "mysql2";

export class RoleDAOImp implements RoleDAO {
    async createAdminRole(alias: string): Promise<Role> {
        return await DB.databaseOperation<Role>( async (connection) => {
            const SQL = `
                INSERT INTO UserRole (alias, role)
                VALUES (?, ?)
            `

            await connection.execute(SQL, [alias, RoleTypes.ADMIN])

            const RoleArray: RoleTypes[] = [RoleTypes.ADMIN]
            return new Role(RoleArray)
        })
    }
    async createRole(alias: string): Promise<Role> {
        return await DB.databaseOperation<Role>( async (connection) => {
            const SQL = `
                INSERT INTO UserRole (alias, role)
                VALUES (?, ?)
            `

            await connection.execute(SQL, [alias, RoleTypes.USER])

            const RoleArray: RoleTypes[] = [RoleTypes.USER]
            return new Role(RoleArray)
        })
    }

    async readRolesByAlias(alias: string): Promise<Role | null> {
        return await DB.databaseOperation<Role | null>( async (connection) => {
            const SQL = `
                SELECT role FROM UserRole WHERE alias = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [alias])

            if (Array.isArray(rows) && rows.length > 0) {
                const roles: RoleTypes[] = []
                rows.forEach((row) => {
                    const { role } = row
                    roles.push(role)
                })
                return new Role(roles)
            }
            return null
        })
    }
}