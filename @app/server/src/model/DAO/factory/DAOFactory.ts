import { AssignmentDAO } from "../interface/AssignmentDAO";
import { AuthDAO } from "../interface/AuthDAO";
import { RoleDAO } from "../interface/RoleDAO";
import { SubmissionDAO } from "../interface/SubmissionDAO";
import { UserAssignmentDAO } from "../interface/UserAssignmentDAO";
import { UserDAO } from "../interface/UserDAO";

export interface DAOFactory {
    createUserDAO(): UserDAO
    createAuthDAO(): AuthDAO
    createRoleDAO(): RoleDAO
    createAssignmentDAO(): AssignmentDAO
    createSubmissionDAO(): SubmissionDAO
    createUserAssignmentDAO(): UserAssignmentDAO
}