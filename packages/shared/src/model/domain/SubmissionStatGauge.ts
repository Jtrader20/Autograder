import { SubmissionStatGaugeDTO } from "../DTO/SubmissionStatGaugeDTO"

export class SubmissionStatGauge {
    private _category: string
    private _studentcount: number

    public constructor(category: string, studentcount: number) {
        this._category = category
        this._studentcount = studentcount
    }

    public get category(): string {
        return this._category
    }

    public set category(value: string) {
        this._category = value
    }

    public get studentcount(): number {
        return this._studentcount
    }

    public set studentcount(value: number) {
        this._studentcount = value
    }

    public static fromJson(json: string | null | undefined): SubmissionStatGauge | null {
        if (!!json) {
            const jsonObject: {
                category: string,
                studentcount: number
            } = JSON.parse(json)
            return new SubmissionStatGauge(jsonObject.category, jsonObject.studentcount)
        } else {
            return null
        }
    }

    public toJson(): string {
        return JSON.stringify(this)
    }

    public get DTO(): SubmissionStatGaugeDTO {
        return {
            category: this.category,
            studentcount: this.studentcount
        }
    }

    public static fromDTO(DTO: SubmissionStatGaugeDTO): SubmissionStatGauge {
        return new SubmissionStatGauge(DTO.category, DTO.studentcount)
    }
}