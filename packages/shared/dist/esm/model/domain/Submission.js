export class Submission {
    _alias;
    _assignmentid;
    _title;
    _scoreEarned;
    _scoreTotal;
    _submissionTime;
    _duration;
    _status;
    _tasks;
    constructor(alias, assignmentid, title, scoreEarned, scoreTotal, submissionTime, duration, status, tasks) {
        this._alias = alias;
        this._assignmentid = assignmentid;
        this._title = title;
        this._scoreEarned = scoreEarned;
        this._scoreTotal = scoreTotal;
        this._submissionTime = submissionTime;
        this._duration = duration;
        this._status = status;
        this._tasks = tasks;
    }
    static fromJson(json) {
        if (!!json) {
            const jsonObject = JSON.parse(json);
            return new Submission(jsonObject.alias, jsonObject.assignmentid, jsonObject.title, jsonObject.scoreEarned, jsonObject.scoreTotal, jsonObject.submissionTime, jsonObject.duration, jsonObject.status, jsonObject.tasks);
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
            alias: this._alias,
            assignmentid: this._assignmentid,
            title: this._title,
            scoreEarned: this._scoreEarned,
            scoreTotal: this._scoreTotal,
            submissionTime: this._submissionTime,
            duration: this._duration,
            status: this._status,
            tasks: this._tasks
        };
    }
    static fromDTO(DTO) {
        return new Submission(DTO.alias, DTO.assignmentid, DTO.title, DTO.scoreEarned, DTO.scoreTotal, DTO.submissionTime, DTO.duration, DTO.status, DTO.tasks);
    }
    get alias() {
        return this._alias;
    }
    set alias(value) {
        this._alias = value;
    }
    get assignmentid() {
        return this._assignmentid;
    }
    set assignmentid(value) {
        this._assignmentid = value;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get scoreEarned() {
        return this._scoreEarned;
    }
    set scoreEarned(value) {
        this._scoreEarned = value;
    }
    get scoreTotal() {
        return this._scoreTotal;
    }
    set scoreTotal(value) {
        this._scoreTotal = value;
    }
    get submissionTime() {
        return this._submissionTime;
    }
    set submissionTime(value) {
        this._submissionTime = value;
    }
    get duration() {
        return this._duration;
    }
    set duration(value) {
        this._duration = value;
    }
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    get tasks() {
        return this._tasks;
    }
    set tasks(value) {
        this._tasks = value;
    }
}
