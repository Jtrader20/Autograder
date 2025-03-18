export interface AssignmentDTO {
    readonly id: string,
    readonly name: string,
    readonly dueDate: number,
    readonly maxSubmissions: number,
    readonly openDate: number,
    readonly closeDate: number,
    readonly maxScore: number
    readonly type: string
}