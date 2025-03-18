import { Assignment } from "@autograder/shared";

export interface AssignmentDAO {
    readAssignments(): Promise<Assignment[]>
    readAssignmentById(assignmentid: string): Promise<Assignment>
}