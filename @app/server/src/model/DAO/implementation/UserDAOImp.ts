import { User } from "@autograder/shared"
import { UserDAO } from "../interface/UserDAO";
import { DB } from "./database/SQLDatabase";
import { RowDataPacket } from "mysql2";
import bcrypt from 'bcryptjs'

export class UserDAOImp implements UserDAO {
    async createUser(alias: string, firstName: string, lastName: string, hashedPassword: string): Promise<User> {
        return await DB.databaseOperation<User>( async (connection) => {
            const SQL = `
                INSERT INTO User (alias, firstName, lastName, hashedPassword)
                VALUES (?, ?, ?, ?)
            `

            await connection.execute(SQL, [alias, firstName, lastName, hashedPassword])

            return new User(firstName, lastName, alias, 2)
        })
    }

    async readUserByAlias(alias: string): Promise<User | null> {
        return await DB.databaseOperation<User | null>( async (connection) => {
            const SQL = `
                SELECT * FROM User WHERE alias = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [alias])

            if (Array.isArray(rows) && rows.length > 0) {
                const { alias, firstName, lastName, graceDays } = rows[0]
                return new User(firstName, lastName, alias, graceDays)
            }

            return null
        })
    }

    async readUserByAliasPassword(alias: string, password: string): Promise<User | null> {
        return await DB.databaseOperation<User | null>( async (connection) => {
            console.log('here1')
            console.log(alias)
            const SQL = `
                SELECT * FROM User WHERE alias = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [alias])
            console.log('here 2')
            if (Array.isArray(rows) && rows.length > 0) {
                console.log('here 3')
                const { alias, firstName, lastName, graceDays, hashedPassword } = rows[0]

                console.table(rows[0])

                if (await bcrypt.compare(password, hashedPassword)) {
                    return new User(firstName, lastName, alias, graceDays)
                }
            }

            return null
        })
    }
}