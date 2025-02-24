import { AutograderRequest } from "./AutograderRequest";

export interface RegisterRequest extends AutograderRequest {
    firstName: string,
    lastName: string,
    alias: string,
    password: string
}