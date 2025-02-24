import { Role } from "@autograder/shared"

export interface RoleDAO {
    createRole(alias: string): Promise<Role>
}