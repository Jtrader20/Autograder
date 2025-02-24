import { RoleDTO } from "../DTO/RoleDTO"

export class Role {
    private _roles: string[]
    
    public constructor(roles: string[]) {
        this._roles = roles
    }
    
    public get roles(): string[] {
        return this._roles
    }
    public set roles(value: string[]) {
        this._roles = value
    }

    public static fromJson(json: string | null | undefined): Role | null {
        if (!!json) {
            const jsonObject: {
                _roles: string[]
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