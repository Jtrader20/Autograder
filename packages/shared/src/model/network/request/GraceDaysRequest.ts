import { AuthRequest } from "./AuthRequest";

export interface GraceDaysRequest extends AuthRequest {
    admin: string,
    user: string,
    gracedays: number
}