import { AuthTokenDTO } from "../DTO/AuthTokenDTO";
export declare class AuthToken {
    private _token;
    private _timestamp;
    static generate(): AuthToken;
    private static generateToken;
    constructor(token: string, timestamp: number);
    get token(): string;
    set token(value: string);
    get timestamp(): number;
    set timestamp(value: number);
    static fromJson(json: string | null | undefined): AuthToken | null;
    toJson(): string;
    get DTO(): AuthTokenDTO;
    static fromDTO(DTO: AuthTokenDTO): AuthToken;
}
//# sourceMappingURL=AuthToken.d.ts.map