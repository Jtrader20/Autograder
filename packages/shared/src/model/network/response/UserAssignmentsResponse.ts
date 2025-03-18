
import { UserAssignmentDTO } from "../../DTO/UserAssignmentDTO";
import { AutograderResponse } from "./AutograderResponse";

export interface UserAssignmentsResponse extends AutograderResponse {
    UserAssignments: UserAssignmentDTO[]
}