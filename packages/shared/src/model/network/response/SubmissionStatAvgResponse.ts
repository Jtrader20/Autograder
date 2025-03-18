import { SubmissionStatAvgDTO } from "../../DTO/SubmissionStatAvgDTO";
import { AutograderResponse } from "./AutograderResponse";

export interface SubmissionStatAvgResponse extends AutograderResponse {
    SubmissionStatAvg: SubmissionStatAvgDTO
}