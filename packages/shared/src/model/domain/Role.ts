import { RoleDTO } from "../DTO/RoleDTO"

export enum RoleTypes {
    USER = "USER",
    ADMIN = "ADMIN"
}

export class Role {
    private _roles: RoleTypes[]
    
    public constructor(roles: RoleTypes[]) {
        this._roles = roles
    }
    
    public get roles(): RoleTypes[] {
        return this._roles
    }
    public set roles(value: RoleTypes[]) {
        this._roles = value
    }

    public static fromJson(json: string | null | undefined): Role | null {
        if (!!json) {
            const jsonObject: {
                _roles: RoleTypes[]
            } = JSON.parse(json)
            return new Role(jsonObject._roles)
        } else {
            return null
        }
    }

    public toJson(): string {
        return JSON.stringify(this)
    }

    public get DTO (): RoleDTO {
        return {
            roles: this.roles
        }
    }

    public static fromDTO(DTO: RoleDTO): Role {
        return new Role(DTO.roles)
    }
    
}