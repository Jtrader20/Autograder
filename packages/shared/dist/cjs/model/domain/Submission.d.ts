import { SubmissionDTO } from "../DTO/SubmissionDTO";
import { TaskDTO } from "../DTO/TaskDTO";
export declare class Submission {
    private _alias;
    private _assignmentid;
    private _title;
    private _scoreEarned;
    private _scoreTotal;
    private _submissionTime;
    private _duration;
    private _status;
    private _tasks;
    constructor(alias: string, assignmentid: string, title: string, scoreEarned: number, scoreTotal: number, submissionTime: number, duration: number, status: string, tasks: TaskDTO[]);
    static fromJson(json: string | null | undefined): Submission | null;
    toJson(): string;
    get DTO(): SubmissionDTO;
    static fromDTO(DTO: SubmissionDTO): Submission;
    get alias(): string;
    set alias(value: string);
    get assignmentid(): string;
    set assignmentid(value: string);
    get title(): string;
    set title(value: string);
    get scoreEarned(): number;
    set scoreEarned(value: number);
    get scoreTotal(): number;
    set scoreTotal(value: number);
    get submissionTime(): number;
    set submissionTime(value: number);
    get duration(): number;
    set duration(value: number);
    get status(): string;
    set status(value: string);
    get tasks(): TaskDTO[];
    set tasks(value: TaskDTO[]);
}
//# sourceMappingURL=Submission.d.ts.map