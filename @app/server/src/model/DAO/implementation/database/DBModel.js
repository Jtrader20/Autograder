"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBModel = [
    `CREATE TABLE IF NOT EXISTS Auth (
        alias VARCHAR(255) PRIMARY KEY,
        token VARCHAR(255) NOT NULL,
        timestamp DATETIME NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS User (
        alias VARCHAR(255) PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        hashedPassword VARCHAR(255) NOT NULL,
        graceDays INT DEFAULT 2
    )`,
    `CREATE TABLE IF NOT EXISTS UserRole (
        id INT AUTO_INCREMENT PRIMARY KEY,
        alias VARCHAR(255) NOT NULL,
        role ENUM('USER', 'ADMIN') NOT NULL,
        FOREIGN KEY (alias) REFERENCES User(alias) ON DELETE CASCADE
    )`
];
exports.default = DBModel;
