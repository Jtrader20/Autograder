import { AssignmentDTO } from "../DTO/AssignmentDTO";
export declare class Assignment {
    private _id;
    private _name;
    private _dueDate;
    private _maxSubmissions;
    private _openDate;
    private _closeDate;
    private _maxScore;
    private _type;
    constructor(id: string, name: string, dueDate: number, maxSubmissions: number, openDate: number, closeDate: number, maxScore: number, type: string);
    get id(): string;
    get name(): string;
    get dueDate(): number;
    get maxSubmissions(): number;
    get openDate(): number;
    get closeDate(): number;
    get maxScore(): number;
    get type(): string;
    set id(value: string);
    set name(value: string);
    set dueDate(value: number);
    set maxSubmissions(value: number);
    set openDate(value: number);
    set closeDate(value: number);
    set maxScore(value: number);
    set type(value: string);
    static fromJson(json: string | null | undefined): Assignment | null;
    toJson(): string;
    get DTO(): AssignmentDTO;
    static fromDTO(DTO: AssignmentDTO): Assignment;
}
//# sourceMappingURL=Assignment.d.ts.map