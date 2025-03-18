import { SubmissionStatAvgDTO } from "../DTO/SubmissionStatAvgDTO"

export class SubmissionStatAvg {
    private _avgsubmitted: number
    private _avgall: number

    public constructor(avgsubmitted: number, avgall: number) {
        this._avgsubmitted = avgsubmitted
        this._avgall = avgall
    }

    public get avgsubmitted(): number {
        return this._avgsubmitted
    }

    public set avgsubmitted(value: number) {
        this._avgsubmitted = value
    }

    public get avgall(): number {
        return this._avgall
    }

    public set avgall(value: number) {
        this._avgall = value
    }

    public static fromJson(json: string | null | undefined): SubmissionStatAvg | null {
        if (!!json) {
            const jsonObject: {
                avgsubmitted: number,
                avgall: number
            } = JSON.parse(json)
            return new SubmissionStatAvg(jsonObject.avgsubmitted, jsonObject.avgall)
        } else {
            return null
        }
    }

    public toJson(): string {
        return JSON.stringify(this)
    }

    public get DTO(): SubmissionStatAvgDTO {
        return {
            avgsubmitted: this.avgsubmitted,
            avgall: this.avgall
        }
    }

    public static fromDTO(DTO: SubmissionStatAvgDTO): SubmissionStatAvg {
        return new SubmissionStatAvg(DTO.avgsubmitted, DTO.avgall)
    }
}