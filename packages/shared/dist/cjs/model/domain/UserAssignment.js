"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAssignment = void 0;
class UserAssignment {
    _alias;
    _assignmentid;
    _scoreearned;
    _maxscore;
    _gracedaysearned;
    _gracedaysused;
    _modifieddate;
    _creditreceived;
    _submitrange;
    constructor(alias, assignmentid, scoreearned, maxscore, gracedaysearned, gracedaysused, modifieddate, creditreceived, submitrange) {
        this._alias = alias;
        this._assignmentid = assignmentid;
        this._scoreearned = scoreearned;
        this._maxscore = maxscore;
        this._gracedaysearned = gracedaysearned;
        this._gracedaysused = gracedaysused;
        this._modifieddate = modifieddate;
        this._creditreceived = creditreceived;
        this._submitrange = submitrange;
    }
    get alias() {
        return this._alias;
    }
    get assignmentid() {
        return this._assignmentid;
    }
    get scoreearned() {
        return this._scoreearned;
    }
    set scoreearned(value) {
        this._scoreearned = value;
    }
    get maxscore() {
        return this._maxscore;
    }
    get gracedaysearned() {
        return this._gracedaysearned;
    }
    set gracedaysearned(value) {
        this._gracedaysearned = value;
    }
    get gracedaysused() {
        return this._gracedaysused;
    }
    set gracedaysused(value) {
        this._gracedaysused = value;
    }
    get modifieddate() {
        return this._modifieddate;
    }
    set modifieddate(value) {
        this._modifieddate = value;
    }
    get creditreceived() {
        return this._creditreceived;
    }
    set creditreceived(value) {
        this._creditreceived = value;
    }
    get submitrange() {
        return this._submitrange;
    }
    set submitrange(value) {
        this._submitrange = value;
    }
    toJson() {
        return JSON.stringify(this);
    }
    get DTO() {
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
        };
    }
    static fromJson(json) {
        if (!!json) {
            const obj = JSON.parse(json);
            return new UserAssignment(obj.alias, obj.assignmentid, obj.scoreearned, obj.maxscore, obj.gracedaysearned, obj.gracedaysused, obj.modifieddate, obj.creditreceived, obj.submitrange);
        }
        return null;
    }
    static fromDTO(dto) {
        return new UserAssignment(dto.alias, dto.assignmentid, dto.scoreearned, dto.maxscore, dto.gracedaysearned, dto.gracedaysused, dto.modifieddate, dto.creditreceived, dto.submitrange);
    }
}
exports.UserAssignment = UserAssignment;
