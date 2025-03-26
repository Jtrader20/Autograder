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

    async readAuthToken(authToken: string): Promise<AuthToken | null> {
        return await DB.databaseOperation<AuthToken | null>( async (connection) => {
            const SQL = `
                SELECT * 
                FROM Auth 
                WHERE token = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [authToken])

            if (Array.isArray(rows) && rows.length > 0) {
                const { token, timestamp } = rows[0]
                return new AuthToken(token, timestamp)
            } 

            return null
        })
    }

    async readAuthTokenWithAlias(authToken: string, alias: string): Promise<AuthToken | null> {
        return await DB.databaseOperation<AuthToken | null> ( async (connection) => {
            const SQL = `
                SELECT * 
                FROM Auth 
                WHERE token = ? AND alias = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [authToken, alias])

            if (Array.isArray(rows) && rows.length > 0) {
                const { token, timestamp } = rows[0]
                return new AuthToken(token, timestamp)
            } 

            return null
        })
    }

    async updateTimestamp(authToken: string, timestamp: number): Promise<void> {
        return await DB.databaseOperation(async (connection) => {
            const SQL = `
                UPDATE Auth
                SET timestamp = FROM_UNIXTIME(? / 1000)
                WHERE token = ?
            `

            await connection.execute(SQL, [timestamp, authToken])
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