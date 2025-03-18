import { UserAssignment, UserRequest } from "@autograder/shared";
import { Service } from "./Service";

export class UserAssignmentService extends Service {
    public async getAllUserAssignments(authToken: string, alias: string): Promise<UserAssignment[]> {
        const request: UserRequest = {
            authToken,
            alias
        }

        return this.facade.getAllUserAssignments(request)
    }
}