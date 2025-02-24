import { AutograderRequest } from "./AutograderRequest";

export interface AuthRequest extends AutograderRequest {
    authToken: string
}