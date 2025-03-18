"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.RoleTypes = void 0;
var RoleTypes;
(function (RoleTypes) {
    RoleTypes["USER"] = "USER";
    RoleTypes["ADMIN"] = "ADMIN";
})(RoleTypes || (exports.RoleTypes = RoleTypes = {}));
class Role {
    _roles;
    constructor(roles) {
        this._roles = roles;
    }
    get roles() {
        return this._roles;
    }
    set roles(value) {
        this._roles = value;
    }
    static fromJson(json) {
        if (!!json) {
            const jsonObject = JSON.parse(json);
            return new Role(jsonObject._roles);
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
            roles: this.roles
        };
    }
    static fromDTO(DTO) {
        return new Role(DTO.roles);
    }
}
exports.Role = Role;
