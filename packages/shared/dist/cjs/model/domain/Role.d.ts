import { RoleDTO } from "../DTO/RoleDTO";
export declare enum RoleTypes {
    USER = "USER",
    ADMIN = "ADMIN"
}
export declare class Role {
    private _roles;
    constructor(roles: RoleTypes[]);
    get roles(): RoleTypes[];
    set roles(value: RoleTypes[]);
    static fromJson(json: string | null | undefined): Role | null;
    toJson(): string;
    get DTO(): RoleDTO;
    static fromDTO(DTO: RoleDTO): Role;
}
//# sourceMappingURL=Role.d.ts.map