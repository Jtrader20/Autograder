import { AssignmentDTO } from "../DTO/AssignmentDTO"

export class Assignment {
    private _id: string
    private _name: string
    private _dueDate: number
    private _maxSubmissions: number
    private _openDate: number
    private _closeDate: number
    private _maxScore: number
    private _type: string

    public constructor (id: string, name: string, dueDate: number, maxSubmissions: number, openDate: number, closeDate: number, maxScore: number, type: string) {
        this._id = id
        this._name = name
        this._dueDate = dueDate
        this._maxScore = maxScore
        this._maxSubmissions = maxSubmissions
        this._openDate = openDate
        this._closeDate = closeDate
        this._type = type
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get dueDate(): number {
        return this._dueDate;
    }

    get maxSubmissions(): number {
        return this._maxSubmissions;
    }

    get openDate(): number {
        return this._openDate;
    }

    get closeDate(): number {
        return this._closeDate;
    }

    get maxScore(): number {
        return this._maxScore;
    }

    get type(): string {
        return this._type
    }

    set id(value: string) {
        this._id = value;
    }

    set name(value: string) {
        this._name = value;
    }

    set dueDate(value: number) {
        this._dueDate = value;
    }

    set maxSubmissions(value: number) {
        this._maxSubmissions = value;
    }

    set openDate(value: number) {
        this._openDate = value;
    }

    set closeDate(value: number) {
        this._closeDate = value;
    }

    set maxScore(value: number) {
        this._maxScore = value;
    }

    set type(value: string) {
        this._type
    }


    public static fromJson(json: string | null | undefined): Assignment | null {
        if (!!json) {
            const jsonObject: {
                _id: string;
                _name: string;
                _dueDate: number;
                _maxSubmissions: number;
                _openDate: number;
                _closeDate: number;
                _maxScore: number
                _type: string
            } = JSON.parse(json)
            return new Assignment(jsonObject._id, jsonObject._name, jsonObject._dueDate, jsonObject._maxSubmissions, jsonObject._openDate, jsonObject._closeDate, jsonObject._maxScore, jsonObject._type)
        } else {
            return null
        }
    }

    public toJson(): string {
        return JSON.stringify(this)
    }

    public get DTO (): AssignmentDTO {
        return {
            id: this.id,
            name: this.name,
            dueDate: this.dueDate,
            maxSubmissions: this.maxSubmissions,
            openDate: this.openDate,
            closeDate: this.closeDate,
            maxScore: this.maxScore,
            type: this.type
        }
    }

    public static fromDTO(DTO: AssignmentDTO): Assignment {
        return new Assignment(DTO.id, DTO.name, DTO.dueDate, DTO.maxSubmissions, DTO.openDate, DTO.closeDate, DTO.maxScore, DTO.type)
    }
}