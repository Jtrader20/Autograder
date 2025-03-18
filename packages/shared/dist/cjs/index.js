"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleTypes = exports.UserAssignment = exports.SubmissionStatGauge = exports.SubmissionStatTime = exports.SubmissionStatAvg = exports.Submission = exports.Assignment = exports.Role = exports.AuthToken = exports.User = void 0;
// Domain
var User_1 = require("./model/domain/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
var AuthToken_1 = require("./model/domain/AuthToken");
Object.defineProperty(exports, "AuthToken", { enumerable: true, get: function () { return AuthToken_1.AuthToken; } });
var Role_1 = require("./model/domain/Role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return Role_1.Role; } });
var Assignment_1 = require("./model/domain/Assignment");
Object.defineProperty(exports, "Assignment", { enumerable: true, get: function () { return Assignment_1.Assignment; } });
var Submission_1 = require("./model/domain/Submission");
Object.defineProperty(exports, "Submission", { enumerable: true, get: function () { return Submission_1.Submission; } });
var SubmissionStatAvg_1 = require("./model/domain/SubmissionStatAvg");
Object.defineProperty(exports, "SubmissionStatAvg", { enumerable: true, get: function () { return SubmissionStatAvg_1.SubmissionStatAvg; } });
var SubmissionStatTime_1 = require("./model/domain/SubmissionStatTime");
Object.defineProperty(exports, "SubmissionStatTime", { enumerable: true, get: function () { return SubmissionStatTime_1.SubmissionStatTime; } });
var SubmissionStatGauge_1 = require("./model/domain/SubmissionStatGauge");
Object.defineProperty(exports, "SubmissionStatGauge", { enumerable: true, get: function () { return SubmissionStatGauge_1.SubmissionStatGauge; } });
var UserAssignment_1 = require("./model/domain/UserAssignment");
Object.defineProperty(exports, "UserAssignment", { enumerable: true, get: function () { return UserAssignment_1.UserAssignment; } });
// Enums
var Role_2 = require("./model/domain/Role");
Object.defineProperty(exports, "RoleTypes", { enumerable: true, get: function () { return Role_2.RoleTypes; } });
