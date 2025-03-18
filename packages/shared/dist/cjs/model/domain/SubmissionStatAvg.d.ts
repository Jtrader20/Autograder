import { SubmissionStatAvgDTO } from "../DTO/SubmissionStatAvgDTO";
export declare class SubmissionStatAvg {
    private _avgsubmitted;
    private _avgall;
    constructor(avgsubmitted: number, avgall: number);
    get avgsubmitted(): number;
    set avgsubmitted(value: number);
    get avgall(): number;
    set avgall(value: number);
    static fromJson(json: string | null | undefined): SubmissionStatAvg | null;
    toJson(): string;
    get DTO(): SubmissionStatAvgDTO;
    static fromDTO(DTO: SubmissionStatAvgDTO): SubmissionStatAvg;
}
//# sourceMappingURL=SubmissionStatAvg.d.ts.map