import { AuthRequest } from "./AuthRequest";

export interface UserRequest extends AuthRequest {
    readonly alias: string
}