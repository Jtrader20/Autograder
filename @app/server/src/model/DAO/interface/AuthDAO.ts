import { AuthToken } from "@autograder/shared"

export interface AuthDAO {
    createAuthToken(alias: string): Promise<AuthToken>
    readAuthToken(authToken: string): Promise<AuthToken | null>
    readAuthTokenWithAlias(authToken: string, alias: string): Promise<AuthToken | null>
    updateTimestamp(authToken: string, timestamp: number): Promise<void>
    deleteAuthToken(authToken: string): Promise<void>
}