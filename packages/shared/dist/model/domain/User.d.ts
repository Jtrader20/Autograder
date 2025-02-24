import { UserDTO } from "../DTO/UserDTO";
export declare class User {
    private _firstName;
    private _lastName;
    private _alias;
    private _graceDays;
    constructor(firstName: string, lastName: string, alias: string, graceDays: number);
    get firstName(): string;
    set firstName(value: string);
    get lastName(): string;
    set lastName(value: string);
    get alias(): string;
    set alias(value: string);
    get graceDays(): number;
    set graceDays(value: number);
    static fromJson(json: string | null | undefined): User | null;
    toJson(): string;
    get DTO(): UserDTO;
    static fromDTO(DTO: UserDTO): User;
}
//# sourceMappingURL=User.d.ts.map