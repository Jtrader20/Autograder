import { UserAssignment } from "@autograder/shared"

export interface UserAssignmentDAO {
    createUserAssignment(userassignment: UserAssignment): Promise<void>
    readUserAssignments(): Promise<UserAssignment[]>
    readUserAssignmentsByAlias(alias: string): Promise<UserAssignment[]>
    readUserAssignmentsByAssignment(assignmentid: string): Promise<UserAssignment[]>
    readUserAssignmentByAliasAssignment(alias: string, assignmentid: string): Promise<UserAssignment | null>
    updateUserAssignment(userassignment: UserAssignment): Promise<void>
}