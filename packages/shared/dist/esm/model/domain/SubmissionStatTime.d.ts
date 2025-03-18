import { SubmissionStatTimeDTO } from "../DTO/SubmissionStatTimeDTO";
export declare class SubmissionStatTime {
    private _fullCredit;
    private _partialCredit;
    private _noCredit;
    private _date;
    constructor(fullCredit: number, partialCredit: number, noCredit: number, date: number);
    get fullCredit(): number;
    set fullCredit(value: number);
    get partialCredit(): number;
    set partialCredit(value: number);
    get noCredit(): number;
    set noCredit(value: number);
    get date(): number;
    set date(value: number);
    static fromJson(json: string | null | undefined): SubmissionStatTime | null;
    toJson(): string;
    get DTO(): SubmissionStatTimeDTO;
    static fromDTO(DTO: SubmissionStatTimeDTO): SubmissionStatTime;
}
//# sourceMappingURL=SubmissionStatTime.d.ts.map