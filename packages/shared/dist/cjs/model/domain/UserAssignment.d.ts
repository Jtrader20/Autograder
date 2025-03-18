import { UserAssignmentDTO } from "../DTO/UserAssignmentDTO";
export declare class UserAssignment {
    private _alias;
    private _assignmentid;
    private _scoreearned;
    private _maxscore;
    private _gracedaysearned;
    private _gracedaysused;
    private _modifieddate;
    private _creditreceived;
    private _submitrange;
    constructor(alias: string, assignmentid: string, scoreearned: number, maxscore: number, gracedaysearned: number, gracedaysused: number, modifieddate: number, creditreceived: string, submitrange: string);
    get alias(): string;
    get assignmentid(): string;
    get scoreearned(): number;
    set scoreearned(value: number);
    get maxscore(): number;
    get gracedaysearned(): number;
    set gracedaysearned(value: number);
    get gracedaysused(): number;
    set gracedaysused(value: number);
    get modifieddate(): number;
    set modifieddate(value: number);
    get creditreceived(): string;
    set creditreceived(value: string);
    get submitrange(): string;
    set submitrange(value: string);
    toJson(): string;
    get DTO(): UserAssignmentDTO;
    static fromJson(json: string | null | undefined): UserAssignment | null;
    static fromDTO(dto: UserAssignmentDTO): UserAssignment;
}
//# sourceMappingURL=UserAssignment.d.ts.map