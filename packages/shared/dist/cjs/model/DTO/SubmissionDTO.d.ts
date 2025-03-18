import { TaskDTO } from "./TaskDTO";
export interface SubmissionDTO {
    readonly alias: string;
    readonly assignmentid: string;
    readonly title: string;
    readonly scoreEarned: number;
    readonly scoreTotal: number;
    readonly submissionTime: number;
    readonly duration: number;
    readonly status: string;
    readonly tasks: TaskDTO[];
}
//# sourceMappingURL=SubmissionDTO.d.ts.map