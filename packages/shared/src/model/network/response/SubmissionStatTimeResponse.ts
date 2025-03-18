import { SubmissionStatTimeDTO } from "../../DTO/SubmissionStatTimeDTO";
import { AutograderResponse } from "./AutograderResponse";

export interface SubmissionStatTimeResponse extends AutograderResponse {
    SubmissionStatTime: SubmissionStatTimeDTO[]
}