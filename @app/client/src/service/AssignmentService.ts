import { Assignment, AuthRequest } from "@autograder/shared";
import { Service } from "./Service";

export class AssignmentService extends Service {
    public async getAssignmentDetails(authToken: string): Promise<Assignment[]> {
        const request: AuthRequest = {
            authToken
        }

        return this.facade.getAssignmentDetails(request)
    }
}