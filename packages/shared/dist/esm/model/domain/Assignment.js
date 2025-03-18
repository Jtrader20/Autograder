export class Assignment {
    _id;
    _name;
    _dueDate;
    _maxSubmissions;
    _openDate;
    _closeDate;
    _maxScore;
    _type;
    constructor(id, name, dueDate, maxSubmissions, openDate, closeDate, maxScore, type) {
        this._id = id;
        this._name = name;
        this._dueDate = dueDate;
        this._maxScore = maxScore;
        this._maxSubmissions = maxSubmissions;
        this._openDate = openDate;
        this._closeDate = closeDate;
        this._type = type;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get dueDate() {
        return this._dueDate;
    }
    get maxSubmissions() {
        return this._maxSubmissions;
    }
    get openDate() {
        return this._openDate;
    }
    get closeDate() {
        return this._closeDate;
    }
    get maxScore() {
        return this._maxScore;
    }
    get type() {
        return this._type;
    }
    set id(value) {
        this._id = value;
    }
    set name(value) {
        this._name = value;
    }
    set dueDate(value) {
        this._dueDate = value;
    }
    set maxSubmissions(value) {
        this._maxSubmissions = value;
    }
    set openDate(value) {
        this._openDate = value;
    }
    set closeDate(value) {
        this._closeDate = value;
    }
    set maxScore(value) {
        this._maxScore = value;
    }
    set type(value) {
        this._type;
    }
    static fromJson(json) {
        if (!!json) {
            const jsonObject = JSON.parse(json);
            return new Assignment(jsonObject._id, jsonObject._name, jsonObject._dueDate, jsonObject._maxSubmissions, jsonObject._openDate, jsonObject._closeDate, jsonObject._maxScore, jsonObject._type);
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
            id: this.id,
            name: this.name,
            dueDate: this.dueDate,
            maxSubmissions: this.maxSubmissions,
            openDate: this.openDate,
            closeDate: this.closeDate,
            maxScore: this.maxScore,
            type: this.type
        };
    }
    static fromDTO(DTO) {
        return new Assignment(DTO.id, DTO.name, DTO.dueDate, DTO.maxSubmissions, DTO.openDate, DTO.closeDate, DTO.maxScore, DTO.type);
    }
}
