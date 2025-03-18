import { UserAssignmentDTO } from "../DTO/UserAssignmentDTO"

export class UserAssignment {
    private _alias: string
    private _assignmentid: string
    private _scoreearned: number
    private _maxscore: number
    private _gracedaysearned: number
    private _gracedaysused: number
    private _modifieddate: number
    private _creditreceived: string
    private _submitrange: string

    public constructor(
        alias: string,
        assignmentid: string,
        scoreearned: number,
        maxscore: number,
        gracedaysearned: number,
        gracedaysused: number,
        modifieddate: number,
        creditreceived: string,
        submitrange: string
    ) {
        this._alias = alias
        this._assignmentid = assignmentid
        this._scoreearned = scoreearned
        this._maxscore = maxscore
        this._gracedaysearned = gracedaysearned
        this._gracedaysused = gracedaysused
        this._modifieddate = modifieddate
        this._creditreceived = creditreceived
        this._submitrange = submitrange
    }

    public get alias(): string {
        return this._alias
    }

    public get assignmentid(): string {
        return this._assignmentid
    }

    public get scoreearned(): number {
        return this._scoreearned
    }

    public set scoreearned(value: number) {
        this._scoreearned = value
    }

    public get maxscore(): number {
        return this._maxscore
    }

    public get gracedaysearned(): number {
        return this._gracedaysearned
    }

    public set gracedaysearned(value: number) {
        this._gracedaysearned = value
    }

    public get gracedaysused(): number {
        return this._gracedaysused
    }

    public set gracedaysused(value: number) {
        this._gracedaysused = value
    }

    public get modifieddate(): number {
        return this._modifieddate
    }

    public set modifieddate(value: number) {
        this._modifieddate = value
    }

    public get creditreceived(): string {
        return this._creditreceived
    }

    public set creditreceived(value: string) {
        this._creditreceived = value
    }

    public get submitrange(): string {
        return this._submitrange
    }

    public set submitrange(value: string) {
        this._submitrange = value
    }

    public toJson(): string {
        return JSON.stringify(this)
    }

    public get DTO(): UserAssignmentDTO {
        return {
            alias: this.alias,
            assignmentid: this.assignmentid,
            scoreearned: this.scoreearned,
            maxscore: this.maxscore,
            gracedaysearned: this.gracedaysearned,
            gracedaysused: this.gracedaysused,
            modifieddate: this.modifieddate,
            creditreceived: this.creditreceived,
            submitrange: this.submitrange
        }
    }

    public static fromJson(json: string | null | undefined): UserAssignment | null {
        if (!!json) {
            const obj: UserAssignmentDTO = JSON.parse(json)
            return new UserAssignment(
                obj.alias,
                obj.assignmentid,
                obj.scoreearned,
                obj.maxscore,
                obj.gracedaysearned,
                obj.gracedaysused,
                obj.modifieddate,
                obj.creditreceived,
                obj.submitrange
            )
        }
        return null
    }

    public static fromDTO(dto: UserAssignmentDTO): UserAssignment {
        return new UserAssignment(
            dto.alias,
            dto.assignmentid,
            dto.scoreearned,
            dto.maxscore,
            dto.gracedaysearned,
            dto.gracedaysused,
            dto.modifieddate,
            dto.creditreceived,
            dto.submitrange
        )
    }
}