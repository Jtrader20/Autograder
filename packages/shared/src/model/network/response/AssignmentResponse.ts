import { AssignmentDTO } from "../../DTO/AssignmentDTO";
import { AutograderResponse } from "./AutograderResponse";

export interface AssignmentResponse extends AutograderResponse {
    Assignments: AssignmentDTO[]
}