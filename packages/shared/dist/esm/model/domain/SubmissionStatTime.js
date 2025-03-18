export class SubmissionStatTime {
    _fullCredit;
    _partialCredit;
    _noCredit;
    _date;
    constructor(fullCredit, partialCredit, noCredit, date) {
        this._fullCredit = fullCredit;
        this._partialCredit = partialCredit;
        this._noCredit = noCredit;
        this._date = date;
    }
    get fullCredit() {
        return this._fullCredit;
    }
    set fullCredit(value) {
        this._fullCredit = value;
    }
    get partialCredit() {
        return this._partialCredit;
    }
    set partialCredit(value) {
        this._partialCredit = value;
    }
    get noCredit() {
        return this._noCredit;
    }
    set noCredit(value) {
        this._noCredit = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
    static fromJson(json) {
        if (!!json) {
            const jsonObject = JSON.parse(json);
            return new SubmissionStatTime(jsonObject.fullcredit, jsonObject.partialcredit, jsonObject.nocredit, jsonObject.date);
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
            fullcredit: this.fullCredit,
            partialcredit: this.partialCredit,
            nocredit: this.noCredit,
            date: this.date
        };
    }
    static fromDTO(DTO) {
        return new SubmissionStatTime(DTO.fullcredit, DTO.partialcredit, DTO.nocredit, DTO.date);
    }
}
