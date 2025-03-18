import { Role } from "@autograder/shared"

export interface RoleDAO {
    createRole(alias: string): Promise<Role>
    readRolesByAlias(alias: string): Promise<Role | null>
}