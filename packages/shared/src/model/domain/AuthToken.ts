import { AuthTokenDTO } from "../DTO/AuthTokenDTO"

export class AuthToken {
    private _token: string
    private _timestamp: number

    public static generate(): AuthToken {
        const token: string = AuthToken.generateToken()
        const timestamp: number = Date.now()
        return new AuthToken(token, timestamp)
    }

    private static generateToken(): string {
        let result = ""
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$^*()-+"
        const charactersLength = characters.length
        for (let i = 0; i < 64; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength))
        }

        return result
    }

    public constructor (token: string, timestamp: number) {
        this._token = token
        this._timestamp = timestamp
    }

    public get token(): string {
        return this._token
    }

    public set token(value: string) {
        this._token = value
    }

    public get timestamp(): number {
        return this._timestamp
    }

    public set timestamp(value: number) {
        this._timestamp = value
    }

    public static fromJson(json: string | null | undefined): AuthToken | null {
        if (!!json) {
            const jsonObject: { _token: string; _timestamp: number } = JSON.parse(json)
            return new AuthToken(jsonObject._token, jsonObject._timestamp)
        } else {
            return null
        }
    }

    public toJson(): string {
        return JSON.stringify(this)
    }

    public get DTO (): AuthTokenDTO {
        return {
            token: this.token,
            timestamp: this.timestamp
        }
    }

    public static fromDTO(DTO: AuthTokenDTO): AuthToken {
        return new AuthToken(DTO.token, DTO.timestamp)
    }
}