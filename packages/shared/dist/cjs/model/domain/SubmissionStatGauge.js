"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionStatGauge = void 0;
class SubmissionStatGauge {
    _category;
    _studentcount;
    constructor(category, studentcount) {
        this._category = category;
        this._studentcount = studentcount;
    }
    get category() {
        return this._category;
    }
    set category(value) {
        this._category = value;
    }
    get studentcount() {
        return this._studentcount;
    }
    set studentcount(value) {
        this._studentcount = value;
    }
    static fromJson(json) {
        if (!!json) {
            const jsonObject = JSON.parse(json);
            return new SubmissionStatGauge(jsonObject.category, jsonObject.studentcount);
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
            category: this.category,
            studentcount: this.studentcount
        };
    }
    static fromDTO(DTO) {
        return new SubmissionStatGauge(DTO.category, DTO.studentcount);
    }
}
exports.SubmissionStatGauge = SubmissionStatGauge;
