"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = void 0;
class AuthToken {
    _token;
    _timestamp;
    static generate() {
        const token = AuthToken.generateToken();
        const timestamp = Date.now();
        return new AuthToken(token, timestamp);
    }
    static generateToken() {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$^*()-+";
        const charactersLength = characters.length;
        for (let i = 0; i < 64; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    constructor(token, timestamp) {
        this._token = token;
        this._timestamp = timestamp;
    }
    get token() {
        return this._token;
    }
    set token(value) {
        this._token = value;
    }
    get timestamp() {
        return this._timestamp;
    }
    set timestamp(value) {
        this._timestamp = value;
    }
    static fromJson(json) {
        if (!!json) {
            const jsonObject = JSON.parse(json);
            return new AuthToken(jsonObject._token, jsonObject._timestamp);
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
            token: this.token,
            timestamp: this.timestamp
        };
    }
    static fromDTO(DTO) {
        return new AuthToken(DTO.token, DTO.timestamp);
    }
}
exports.AuthToken = AuthToken;
