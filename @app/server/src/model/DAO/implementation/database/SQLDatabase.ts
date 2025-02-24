import config from "../../../../config";
import mysql, { RowDataPacket } from "mysql2/promise";
import DBModel from "./DBModel"; 

export class SQLDatabase {
    private static instance: SQLDatabase;
    public initialized: Promise<void>;

    private constructor() {
        this.initialized = this.initDatabase();
    }

    static getInstance(): SQLDatabase {
        if (!SQLDatabase.instance) {
            SQLDatabase.instance = new SQLDatabase();
        }
        return SQLDatabase.instance;
    }

    private async initDatabase(): Promise<void> {
        try {
            const connection = await this._getConnection(false);
            try {
                console.log("Ensuring database exists...");
                const dbExists = await this.checkDatabaseExisits(connection);
                
                if (!dbExists) {
                    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.db.connection.database}\``);
                    await connection.query(`USE \`${config.db.connection.database}\``);

                    for (const statement of DBModel) {
                        await connection.query(statement);
                    }
                    console.log("Database setup complete.");
                } else {
                    console.log("Database already exists.");
                }
            } finally {
                await connection.end();
            }
        } catch (error) {
            console.error(
                JSON.stringify({
                    message: "Error initializing database",
                    exception: (error as Error).message,
                })
            );
        }
    }

    async getConnection(): Promise<mysql.Connection> {
        await this.initialized;
        return this._getConnection();
    }

    private async _getConnection(setUse = true): Promise<mysql.Connection> {
        try {
            const connection = await mysql.createConnection({
                host: config.db.connection.host,
                user: config.db.connection.user,
                password: config.db.connection.password,
                connectTimeout: config.db.connection.connectionTimeout,
                decimalNumbers: true,
            });

            if (setUse) {
                await connection.query(`USE \`${config.db.connection.database}\``);
            }

            return connection;
        } catch (error) {
            console.error("Database connection error:", error);
            throw error;
        }
    }

    private async checkDatabaseExisits(connection: mysql.Connection): Promise<boolean> {
        const [rows] = await connection.execute<RowDataPacket[]>(
            `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
            [config.db.connection.database]
        );
        return rows.length > 0;
    }

    async databaseOperation<T>(operation: (connection: mysql.Connection) => Promise<T>): Promise<T> {
        const connection = await this.getConnection();
        try {
            return await operation(connection);
        } finally {
            await connection.end();
        }
    }
}

export const DB: SQLDatabase = SQLDatabase.getInstance();
