import { AuthDAO } from "../interface/AuthDAO";
import { RoleDAO } from "../interface/RoleDAO";
import { UserDAO } from "../interface/UserDAO";

export interface DAOFactory {
    createUserDAO(): UserDAO
    createAuthDAO(): AuthDAO
    createRoleDAO(): RoleDAO
}