import { AutograderRequest } from "./AutograderRequest"

export interface LoginRequest extends AutograderRequest  {
    alias: string,
    password: string
}