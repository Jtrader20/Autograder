import { UserAssignment, UserAssignmentDTO } from "@autograder/shared";
import { Service } from "./Service";

export class UserAssignmentService extends Service {
    public async getUserAssignmentByAliasAndAssignment(token: string, alias: string, assignmentid: string): Promise<UserAssignment | null> {
        return await this.secureOperation<UserAssignment | null>(token, alias, false, async () => {
            return await this.UserAssignmentDAO.readUserAssignmentByAliasAssignment(alias, assignmentid)
        })
    }

    public async getAllUserAssignments(token: string, alias: string): Promise<UserAssignmentDTO[]> {
        return await this.fetchAndTransform<UserAssignment, UserAssignmentDTO>(token, alias, true, () => this.UserAssignmentDAO.readUserAssignments(), (userassignment) => userassignment.DTO)
    }

    public async createUserAssignment(token: string, alias: string, userassignment: UserAssignment): Promise<void> {
        return await this.secureOperation<void>(token, alias, false, async () => {
            return await this.UserAssignmentDAO.createUserAssignment(userassignment)
        })
    }

    public async updateUserAssignment(token: string, alias: string, userassignment: UserAssignment): Promise<void> {
        return await this.secureOperation<void>(token, alias, false, async () => {
            return await this.UserAssignmentDAO.updateUserAssignment(userassignment)
        })
    }
}