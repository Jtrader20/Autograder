import { AuthRequest } from "./AuthRequest";

export interface SubmissionRequest extends AuthRequest {
    alias: string,
    assignmentid: string
}