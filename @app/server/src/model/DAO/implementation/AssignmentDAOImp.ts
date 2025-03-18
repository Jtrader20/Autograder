import { Assignment } from "@autograder/shared";
import { AssignmentDAO } from "../interface/AssignmentDAO";
import { DB } from "./database/SQLDatabase";
import { RowDataPacket } from "mysql2";

export class AssignmentDAOImp implements AssignmentDAO {
    async readAssignments(): Promise<Assignment[]> {
        return await DB.databaseOperation<Assignment[]>( async (connection) => {
            const SQL = `
                SELECT * FROM Assignment
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL)
            const assignments: Assignment[] = []

            if (Array.isArray(rows) && rows.length > 0) {
                rows.forEach((row) => {
                    const { id, name, dueDate, maxSubmissions, openDate, closeDate, maxScore, type } = row
                    const assignment = new Assignment(id, name, dueDate, maxSubmissions, openDate, closeDate, maxScore, type)
                    assignments.push(assignment)
                })
            }

            return assignments
        })
    }

    async readAssignmentById(assignmentid: string): Promise<Assignment> {
        return await DB.databaseOperation<Assignment> (async (connection) => {
            const SQL = `
                SELECT * FROM Assignment
                WHERE id = ?
            `

            const [rows] = await connection.execute<RowDataPacket[]>(SQL, [assignmentid])

            if (!Array.isArray(rows) || rows.length == 0) {
                throw new Error('No Assignment Found')
            }

            const { id, name, dueDate, maxSubmissions, openDate, closeDate, maxScore, type} = rows[0]
            return new Assignment(id, name, dueDate, maxSubmissions, openDate, closeDate, maxScore, type)
        })
    }    
}