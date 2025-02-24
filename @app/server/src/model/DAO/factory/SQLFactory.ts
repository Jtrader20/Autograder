import { AuthDAOImp } from "../implementation/AuthDAOImp";
import { RoleDAOImp } from "../implementation/RoleDAOImp";
import { UserDAOImp } from "../implementation/UserDAOImp";
import { AuthDAO } from "../interface/AuthDAO";
import { RoleDAO } from "../interface/RoleDAO";
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

}