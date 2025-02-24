import { UserDTO } from "../DTO/UserDTO"

export class User {
    private _firstName: string
    private _lastName: string
    private _alias: string
    private _graceDays: number
    
    public constructor(firstName: string, lastName: string, alias: string, graceDays: number) {
        this._firstName = firstName
        this._lastName = lastName
        this._alias = alias
        this._graceDays = graceDays
    }
    
    public get firstName(): string {
        return this._firstName
    }
    public set firstName(value: string) {
        this._firstName = value
    }
    public get lastName(): string {
        return this._lastName
    }
    public set lastName(value: string) {
        this._lastName = value
    }
    public get alias(): string {
        return this._alias
    }
    public set alias(value: string) {
        this._alias = value
    }
    public get graceDays(): number {
        return this._graceDays
    }
    public set graceDays(value: number) {
        this._graceDays = value
    }

    public static fromJson(json: string | null | undefined): User | null {
        if (!!json) {
            const jsonObject: {
                _firstName: string
                _lastName: string
                _alias: string
                _graceDays: number
            } = JSON.parse(json)
            return new User(jsonObject._firstName, jsonObject._lastName, jsonObject._alias, jsonObject._graceDays)
        } else {
            return null
        }
    }

    public toJson(): string {
        return JSON.stringify(this)
    }

    public get DTO (): UserDTO {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            alias: this.alias,
            graceDays: this.graceDays
        }
    }
    
    public static fromDTO(DTO: UserDTO): User {
        return new User(DTO.firstName, DTO.lastName, DTO.alias, DTO.graceDays)
    }
}