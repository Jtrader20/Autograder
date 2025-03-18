import { SubmissionDTO } from "../DTO/SubmissionDTO";
import { TaskDTO } from "../DTO/TaskDTO";

export class Submission {
    private _alias: string;
    private _assignmentid: string;
    private _title: string;
    private _scoreEarned: number;
    private _scoreTotal: number;
    private _submissionTime: number;
    private _duration: number;
    private _status: string;
    private _tasks: TaskDTO[];

    public constructor(alias: string, assignmentid: string, title: string, scoreEarned: number, scoreTotal: number, submissionTime: number, duration: number, status: string, tasks: TaskDTO[]) {
        this._alias = alias;
        this._assignmentid = assignmentid;
        this._title = title;
        this._scoreEarned = scoreEarned;
        this._scoreTotal = scoreTotal;
        this._submissionTime = submissionTime;
        this._duration = duration;
        this._status = status;
        this._tasks = tasks;
    }

    public static fromJson(json: string | null | undefined): Submission | null {
        if (!!json) {
            const jsonObject: { alias: string; assignmentid: string; title: string; scoreEarned: number; scoreTotal: number; submissionTime: number; duration: number; status: string; tasks: TaskDTO[] } = JSON.parse(json);
            return new Submission(jsonObject.alias, jsonObject.assignmentid, jsonObject.title, jsonObject.scoreEarned, jsonObject.scoreTotal, jsonObject.submissionTime, jsonObject.duration, jsonObject.status, jsonObject.tasks);
        } else {
            return null;
        }
    }

    public toJson(): string {
        return JSON.stringify(this);
    }

    public get DTO(): SubmissionDTO {
        return {
            alias: this._alias,
            assignmentid: this._assignmentid,
            title: this._title,
            scoreEarned: this._scoreEarned,
            scoreTotal: this._scoreTotal,
            submissionTime: this._submissionTime,
            duration: this._duration,
            status: this._status,
            tasks: this._tasks
        };
    }

    public static fromDTO(DTO: SubmissionDTO): Submission {
        return new Submission(DTO.alias, DTO.assignmentid, DTO.title, DTO.scoreEarned, DTO.scoreTotal, DTO.submissionTime, DTO.duration, DTO.status, DTO.tasks);
    }

    public get alias(): string {
        return this._alias;
    }

    public set alias(value: string) {
        this._alias = value;
    }

    public get assignmentid(): string {
        return this._assignmentid;
    }

    public set assignmentid(value: string) {
        this._assignmentid = value;
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get scoreEarned(): number {
        return this._scoreEarned;
    }

    public set scoreEarned(value: number) {
        this._scoreEarned = value;
    }

    public get scoreTotal(): number {
        return this._scoreTotal;
    }

    public set scoreTotal(value: number) {
        this._scoreTotal = value;
    }

    public get submissionTime(): number {
        return this._submissionTime;
    }

    public set submissionTime(value: number) {
        this._submissionTime = value;
    }

    public get duration(): number {
        return this._duration;
    }

    public set duration(value: number) {
        this._duration = value;
    }

    public get status(): string {
        return this._status;
    }

    public set status(value: string) {
        this._status = value;
    }

    public get tasks(): TaskDTO[] {
        return this._tasks;
    }

    public set tasks(value: TaskDTO[]) {
        this._tasks = value;
    }
}
