import { AuthToken } from "@autograder/shared"

export interface AuthDAO {
    createAuthToken(alias: string): Promise<AuthToken>
    readAuthToken(authToken: string): Promise<boolean>
    deleteAuthToken(authToken: string): Promise<void>
}