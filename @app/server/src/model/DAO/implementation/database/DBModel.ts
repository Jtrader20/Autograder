const DBModel: string[] = [
    `CREATE TABLE IF NOT EXISTS Auth (
        alias VARCHAR(255) NOT NULL,
        token VARCHAR(255) NOT NULL,
        timestamp DATETIME NOT NULL,
        PRIMARY KEY (alias, token)
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
    )`,
    `CREATE TABLE IF NOT EXISTS Assignment (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        dueDate DATETIME NOT NULL,
        maxSubmissions INT NOT NULL,
        openDate DATETIME NOT NULL,
        closeDate DATETIME NOT NULL,
        maxScore DECIMAL(10, 2) NOT NULL,
        type VARCHAR(255) NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS UserAssignment (
        assignmentid VARCHAR(255) NOT NULL,
        alias VARCHAR(255) NOT NULL,
        scoreEarned DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        maxScore DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        graceDaysEarned INT DEFAULT 0,
        graceDaysUsed INT DEFAULT 0,
        modifiedDate DATETIME NOT NULL,
        creditReceived ENUM('FULL', 'PARTIAL', 'NO') NOT NULL,
        submitRange ENUM('EARLY', 'ONTIME', 'LATE') NOT NULL,
        FOREIGN KEY (assignmentid) REFERENCES Assignment(id) ON DELETE CASCADE,
        FOREIGN KEY (alias) REFERENCES User(alias) ON DELETE CASCADE,
        PRIMARY KEY (alias, assignmentid)
    )`,
    `CREATE TABLE IF NOT EXISTS Submission (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        alias VARCHAR(255) NOT NULL,
        assignmentid VARCHAR(255) NOT NULL,
        submissionTime DATETIME NOT NULL,
        scoreEarned DECIMAL(10,2) NULL,
        scoreTotal DECIMAL(10,2) NULL,
        duration INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        tasks JSON NULL,
        FOREIGN KEY (alias) REFERENCES User(alias) ON DELETE CASCADE,
        FOREIGN KEY (assignmentid) REFERENCES Assignment(id) ON DELETE CASCADE
    )`,
];

export default DBModel;
