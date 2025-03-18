import { User } from "@autograder/shared"
import { UserDAO } from "../interface/UserDAO";
import { DB } from "./database/SQLDatabase";
import { RowDataPacket } from "mysql2";
import bcrypt from 'bcryptjs'

export class UserDAOImp implements UserDAO {
    public async createUser(alias: string, firstName: string, lastName: string, hashedPassword: string): Promise<User> {
        return await DB.databaseOperation<User>( async (connection) => {
            const SQL = `
                INSERT INTO User (alias, firstName, lastName, hashedPassword)
                VALUES (?, ?, ?, ?)
            `

            await connection.execute(SQL, [alias, firstName, lastName, hashedPassword])

            return new User(firstName, lastName, alias, 2)
        })
    }

    public async readUsers(): Promise<User[]> {
        return await DB.databaseOperation<User[]>( async (connection) => {
            const SQL = `
                SELECT *
                FROM User u
                JOIN UserRole ur ON u.alias = ur.alias
                WHERE ur.role = 'USER'
                ORDER BY lastName ASC, firstName ASC
            `;

            const [rows] = await connection.execute<RowDataPacket[]>(SQL)

            const users: User[] = []

            if (Array.isArray(rows) && rows.length > 0) {
                rows.forEach((row) => {
                    const { alias, firstName, lastName, graceDays } = row
                    const user = new User(firstName, lastName, alias, graceDays)
                    users.push(user)
                })
            }

            return users
        })
    }

    public async readUserByAlias(alias: string): Promise<User | null> {
        return await DB.databaseOperation<User | null>( async (connection) => {
            const SQL = `
                SELECT * 
                FROM User 
                WHERE alias = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [alias])

            if (Array.isArray(rows) && rows.length > 0) {
                const { alias, firstName, lastName, graceDays } = rows[0]
                return new User(firstName, lastName, alias, graceDays)
            }

            return null
        })
    }

    public async readUserByAliasPassword(alias: string, password: string): Promise<User | null> {
        return await DB.databaseOperation<User | null>( async (connection) => {
            const SQL = `
                SELECT * 
                FROM User 
                WHERE alias = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [alias])
            if (Array.isArray(rows) && rows.length > 0) {
                const { alias, firstName, lastName, graceDays, hashedPassword } = rows[0]

                if (await bcrypt.compare(password, hashedPassword)) {
                    return new User(firstName, lastName, alias, graceDays)
                }
            }

            return null
        })
    }

    public async updateUserGraceDays(alias: string, updatedgracedaycount: number): Promise<void> {
        return await DB.databaseOperation<void>( async (connection) => {
            const SQL = `
                UPDATE User
                SET graceDays = ?
                WHERE alias = ?
            `

            await connection.execute(SQL, [updatedgracedaycount, alias])
        })
    } 
}