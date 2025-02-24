"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.SQLDatabase = void 0;
const config_1 = __importDefault(require("../../../../config"));
const promise_1 = __importDefault(require("mysql2/promise"));
const DBModel_1 = __importDefault(require("./DBModel"));
class SQLDatabase {
    constructor() {
        this.initialized = this.initDatabase();
    }
    static getInstance() {
        if (!SQLDatabase.instance) {
            SQLDatabase.instance = new SQLDatabase();
        }
        return SQLDatabase.instance;
    }
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield this._getConnection(false);
                try {
                    console.log("Ensuring database exists...");
                    const dbExists = yield this.checkDatabaseExisits(connection);
                    if (!dbExists) {
                        yield connection.query(`CREATE DATABASE IF NOT EXISTS \`${config_1.default.db.connection.database}\``);
                        yield connection.query(`USE \`${config_1.default.db.connection.database}\``);
                        for (const statement of DBModel_1.default) {
                            yield connection.query(statement);
                        }
                        console.log("Database setup complete.");
                    }
                    else {
                        console.log("Database already exists.");
                    }
                }
                finally {
                    yield connection.end();
                }
            }
            catch (error) {
                console.error(JSON.stringify({
                    message: "Error initializing database",
                    exception: error.message,
                }));
            }
        });
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.initialized;
            return this._getConnection();
        });
    }
    _getConnection() {
        return __awaiter(this, arguments, void 0, function* (setUse = true) {
            try {
                const connection = yield promise_1.default.createConnection({
                    host: config_1.default.db.connection.host,
                    user: config_1.default.db.connection.user,
                    password: config_1.default.db.connection.password,
                    connectTimeout: config_1.default.db.connection.connectionTimeout,
                    decimalNumbers: true,
                });
                if (setUse) {
                    yield connection.query(`USE \`${config_1.default.db.connection.database}\``);
                }
                return connection;
            }
            catch (error) {
                console.error("Database connection error:", error);
                throw error;
            }
        });
    }
    checkDatabaseExisits(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield connection.execute(`SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`, [config_1.default.db.connection.database]);
            return rows.length > 0;
        });
    }
    databaseOperation(operation) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.getConnection();
            try {
                return yield operation(connection);
            }
            finally {
                yield connection.end();
            }
        });
    }
}
exports.SQLDatabase = SQLDatabase;
exports.DB = SQLDatabase.getInstance();
