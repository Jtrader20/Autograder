import { Assignment, AssignmentDTO } from "@autograder/shared";
import { Service } from "./Service";

export class AssignmentService extends Service {
    public async getAssignmemtDetails (token: string): Promise<AssignmentDTO[]> {
        return await this.validatedOperation(token, async () => {
            const assignments: Assignment[] = await this.AssignmentDAO.readAssignments()
            const assignmentDTO: AssignmentDTO[] = []
            assignments.forEach((assignment: Assignment) => {
                const DTO = assignment.DTO
                assignmentDTO.push(DTO)
            })

            return assignmentDTO
        })
    }
    public async getAssignment(token: string, alias: string, assignmentid: string): Promise<Assignment> {
        return await this.secureOperation(token, alias, false, async () => {
            return await this.AssignmentDAO.readAssignmentById(assignmentid)
        })
    }
}