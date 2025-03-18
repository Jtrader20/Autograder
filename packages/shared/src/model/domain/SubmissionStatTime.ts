import { SubmissionStatTimeDTO } from "../DTO/SubmissionStatTimeDTO";

export class SubmissionStatTime {
    private _fullCredit: number;
    private _partialCredit: number;
    private _noCredit: number;
    private _date: number;

    public constructor(fullCredit: number, partialCredit: number, noCredit: number, date: number) {
        this._fullCredit = fullCredit;
        this._partialCredit = partialCredit;
        this._noCredit = noCredit;
        this._date = date;
    }

    public get fullCredit(): number {
        return this._fullCredit;
    }
    public set fullCredit(value: number) {
        this._fullCredit = value;
    }

    public get partialCredit(): number {
        return this._partialCredit;
    }
    public set partialCredit(value: number) {
        this._partialCredit = value;
    }

    public get noCredit(): number {
        return this._noCredit;
    }
    public set noCredit(value: number) {
        this._noCredit = value;
    }

    public get date(): number {
        return this._date;
    }
    public set date(value: number) {
        this._date = value;
    }

    public static fromJson(json: string | null | undefined): SubmissionStatTime | null {
        if (!!json) {
            const jsonObject: {
                fullcredit: number,
                partialcredit: number,
                nocredit: number,
                date: number
            } = JSON.parse(json);
            return new SubmissionStatTime(jsonObject.fullcredit, jsonObject.partialcredit, jsonObject.nocredit, jsonObject.date);
        } else {
            return null;
        }
    }

    public toJson(): string {
        return JSON.stringify(this);
    }

    public get DTO(): SubmissionStatTimeDTO {
        return {
            fullcredit: this.fullCredit,
            partialcredit: this.partialCredit,
            nocredit: this.noCredit,
            date: this.date
        };
    }

    public static fromDTO(DTO: SubmissionStatTimeDTO): SubmissionStatTime {
        return new SubmissionStatTime(DTO.fullcredit, DTO.partialcredit, DTO.nocredit, DTO.date);
    }
}
