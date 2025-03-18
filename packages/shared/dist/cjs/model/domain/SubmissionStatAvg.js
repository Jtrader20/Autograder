"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionStatAvg = void 0;
class SubmissionStatAvg {
    _avgsubmitted;
    _avgall;
    constructor(avgsubmitted, avgall) {
        this._avgsubmitted = avgsubmitted;
        this._avgall = avgall;
    }
    get avgsubmitted() {
        return this._avgsubmitted;
    }
    set avgsubmitted(value) {
        this._avgsubmitted = value;
    }
    get avgall() {
        return this._avgall;
    }
    set avgall(value) {
        this._avgall = value;
    }
    static fromJson(json) {
        if (!!json) {
            const jsonObject = JSON.parse(json);
            return new SubmissionStatAvg(jsonObject.avgsubmitted, jsonObject.avgall);
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
            avgsubmitted: this.avgsubmitted,
            avgall: this.avgall
        };
    }
    static fromDTO(DTO) {
        return new SubmissionStatAvg(DTO.avgsubmitted, DTO.avgall);
    }
}
exports.SubmissionStatAvg = SubmissionStatAvg;
