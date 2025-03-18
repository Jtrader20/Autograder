import { SubmissionRequest } from "./SubmissionRequest"

export interface SubmissionStatTimeRequest extends SubmissionRequest {
    startdate: number,
    enddate: number,
}