import { AuthToken } from "@autograder/shared";
import { AuthDAO } from "../interface/AuthDAO";
import { DB } from "./database/SQLDatabase";
import { RowDataPacket } from "mysql2";

export class AuthDAOImp implements AuthDAO {
    async createAuthToken(alias: string): Promise<AuthToken> {
        return await DB.databaseOperation<AuthToken>( async (connection) => {
            const AUTH: AuthToken = AuthToken.generate()
            const token: string = AUTH.token
            const timestamp: number = AUTH.timestamp
            const SQL = `
                INSERT INTO Auth (alias, token, timestamp)
                VALUES (?, ?, FROM_UNIXTIME(? / 1000))
            `

            await connection.execute(SQL, [alias, token, timestamp])

            return AUTH
        })
    }

    async readAuthToken(authToken: string): Promise<boolean> {
        return await DB.databaseOperation<boolean>( async (connection) => {
            const SQL = `
                SELECT * FROM Auth WHERE token = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [authToken])

            return Array.isArray(rows) && rows.length > 0
        })
    }

    async readAuthTokenWithAlias(authToken: string, alias: string): Promise<boolean> {
        return await DB.databaseOperation<boolean> ( async (connection) => {
            const SQL = `
                SELECT * FROM Auth WHERE token = ? AND alias = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [authToken, alias])

            return Array.isArray(rows) && rows.length > 0
        })
    }

    async deleteAuthToken(authToken: string): Promise<void> {
        return await DB.databaseOperation( async (connection) => {
            const SQL = `
                DELETE FROM Auth WHERE token = ?
            `

            await connection.execute(SQL, [authToken])
        })
    }
}