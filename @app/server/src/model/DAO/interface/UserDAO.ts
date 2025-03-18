import { User } from "@autograder/shared"

export interface UserDAO {
    createUser(alias: string, firstName: string, lastName: string, hashedPassword: string): Promise<User>
    readUsers(): Promise<User[]>
    readUserByAlias(alias: string): Promise<User | null>
    readUserByAliasPassword(alias: string, password: string): Promise<User | null>
    updateUserGraceDays(alias: string, updatedgracedaycount: number): Promise<void>
}