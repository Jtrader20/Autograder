import { AssignmentDAOImp } from "../implementation/AssignmentDAOImp";
import { AuthDAOImp } from "../implementation/AuthDAOImp";
import { RoleDAOImp } from "../implementation/RoleDAOImp";
import { SubmissionDAOImp } from "../implementation/SubmissionDAOImp";
import { UserAssignmentDAOImp } from "../implementation/UserAssignmentDAOImp";
import { UserDAOImp } from "../implementation/UserDAOImp";
import { AssignmentDAO } from "../interface/AssignmentDAO";
import { AuthDAO } from "../interface/AuthDAO";
import { RoleDAO } from "../interface/RoleDAO";
import { SubmissionDAO } from "../interface/SubmissionDAO";
import { UserAssignmentDAO } from "../interface/UserAssignmentDAO";
import { UserDAO } from "../interface/UserDAO";
import { DAOFactory } from "./DAOFactory";

export class SQLFactory implements DAOFactory {
    private static instance: SQLFactory

    public static getInstance(): SQLFactory {
        if (!SQLFactory.instance) {
            SQLFactory.instance = new SQLFactory()
        }
        return SQLFactory.instance
    }

    createUserDAO(): UserDAO {
        return new UserDAOImp()
    }

    createAuthDAO(): AuthDAO {
        return new AuthDAOImp()
    }

    createRoleDAO(): RoleDAO {
        return new RoleDAOImp()
    }

    createAssignmentDAO(): AssignmentDAO {
        return new AssignmentDAOImp()
    }

    createSubmissionDAO(): SubmissionDAO {
        return new SubmissionDAOImp()
    }

    createUserAssignmentDAO(): UserAssignmentDAO {
        return new UserAssignmentDAOImp()
    }
}