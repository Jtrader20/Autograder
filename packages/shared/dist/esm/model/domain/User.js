export class User {
    _firstName;
    _lastName;
    _alias;
    _graceDays;
    constructor(firstName, lastName, alias, graceDays) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._alias = alias;
        this._graceDays = graceDays;
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        this._firstName = value;
    }
    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        this._lastName = value;
    }
    get alias() {
        return this._alias;
    }
    set alias(value) {
        this._alias = value;
    }
    get graceDays() {
        return this._graceDays;
    }
    set graceDays(value) {
        this._graceDays = value;
    }
    static fromJson(json) {
        if (!!json) {
            const jsonObject = JSON.parse(json);
            return new User(jsonObject._firstName, jsonObject._lastName, jsonObject._alias, jsonObject._graceDays);
        }
        else {
            return null;
        }
    }
    toJson() {
        return JSON.stringify(this);
    }
    get DTO() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            alias: this.alias,
            graceDays: this.graceDays
        };
    }
    static fromDTO(DTO) {
        return new User(DTO.firstName, DTO.lastName, DTO.alias, DTO.graceDays);
    }
}
