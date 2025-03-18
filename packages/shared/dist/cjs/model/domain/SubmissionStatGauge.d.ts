import { SubmissionStatGaugeDTO } from "../DTO/SubmissionStatGaugeDTO";
export declare class SubmissionStatGauge {
    private _category;
    private _studentcount;
    constructor(category: string, studentcount: number);
    get category(): string;
    set category(value: string);
    get studentcount(): number;
    set studentcount(value: number);
    static fromJson(json: string | null | undefined): SubmissionStatGauge | null;
    toJson(): string;
    get DTO(): SubmissionStatGaugeDTO;
    static fromDTO(DTO: SubmissionStatGaugeDTO): SubmissionStatGauge;
}
//# sourceMappingURL=SubmissionStatGauge.d.ts.map