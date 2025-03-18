export enum RoleTypes {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface RoleDTO {
    readonly roles: RoleTypes[]
}