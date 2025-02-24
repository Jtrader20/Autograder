import { RoleDTO } from "../DTO/RoleDTO";
export declare class Role {
    private _roles;
    constructor(roles: string[]);
    get roles(): string[];
    set roles(value: string[]);
    static fromJson(json: string | null | undefined): Role | null;
    toJson(): string;
    get DTO(): RoleDTO;
    static fromDTO(DTO: RoleDTO): Role;
}
//# sourceMappingURL=Role.d.ts.map