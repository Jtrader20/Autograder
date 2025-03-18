import { Assignment, Files, Submission, UserAssignment } from '@autograder/shared'
import { SQLFactory } from '../../DAO/factory/SQLFactory'
import { AssignmentService } from '../../Service/AssignmentService'
import { SubmissionService } from '../../Service/SubmissionService'
import { UserAssignmentService } from '../../Service/UserAssignmentService'
import { DateUtility } from '../Utility/DateUtility'
import { UserService } from '../../Service/UserService'

export interface BaseSubmissionInfo {
    readonly alias: string,
    readonly token: string,
    readonly assignmentid: string,
    readonly files: Files[]
}

export abstract class BaseSubmissionHandler {
    private graderservice: AssignmentService
    private submissionservice: SubmissionService
    private userassignmentservice: UserAssignmentService
    private userservice: UserService
    private dateutility: DateUtility
    private socket: import('ws')
    private send: any
    protected start: number = 0
    protected end: number = 0

    constructor(socket: import('ws'), send: any) {
        this.graderservice = new AssignmentService(SQLFactory.getInstance())
        this.submissionservice = new SubmissionService(SQLFactory.getInstance())
        this.userassignmentservice = new UserAssignmentService(SQLFactory.getInstance())
        this.userservice = new UserService(SQLFactory.getInstance())
        this.dateutility = new DateUtility(this.userassignmentservice, this.userservice)
        this.socket = socket
        this.send = send
    }
    
    public async handler (submissionInfo: BaseSubmissionInfo): Promise<void> {
        const { alias, token, assignmentid, files } = submissionInfo
        const assignmentdetails: Assignment = await this.getAssignmentDetails(token, alias, assignmentid)
        let basesubmission: Submission = this.createSubmission(alias, assignmentdetails)
        try {
            if (!this.checkCloseDate(assignmentdetails) || !await this.checkNumSubmissions(token, alias, assignmentid, assignmentdetails)) {
                const badsubmission = new Submission(alias, assignmentdetails.id, 'Invalid submission', 0, 0, 0, 0, 'FAILED', [])
                await this.save(badsubmission, token, alias)
                this.sendsubmission(badsubmission)
                return
            }

            this.send(basesubmission)

            this.start = new Date().getTime()
            basesubmission = await this.operation(basesubmission, assignmentdetails, files)
            this.end = new Date().getTime()

            basesubmission = await this.finalChecks(basesubmission, assignmentdetails, token)
            basesubmission.title = "COMPLETED"
            basesubmission.status = basesubmission.scoreEarned >= basesubmission.scoreTotal ? 'SUCCESS' : 'FAILED'

            await this.save(basesubmission, token, alias)
            this.sendsubmission(basesubmission)
        } catch (error) {
            basesubmission.title = 'Submission Error: Reach out to TAs for help'
            basesubmission.status = 'FAILED'

            this.sendsubmission(basesubmission)

            console.log('WS Error: ', (error as Error).message)
        }
    }

    private checkCloseDate(assignment: Assignment): boolean {
        const today = new Date()
        const dueDate = new Date(assignment.closeDate)

        return today < dueDate
    }

    private async save(submission: Submission, token: string, alias: string): Promise<void> {
        await this.submissionservice.saveSubmission(submission, token, alias)
    }

    private async getAssignmentDetails(token: string, alias: string, assignmentid: string): Promise<Assignment> {
        return await this.graderservice.getAssignment(token, alias, assignmentid)
    }

    private async checkNumSubmissions(token: string, alias: string, assignmentid: string, assignment: Assignment): Promise<boolean> {
        const numSubmissions: number = await this.submissionservice.getNumberOfSubmissions(token, alias, assignmentid)
        return numSubmissions <= assignment.maxSubmissions
    }

    private createSubmission(alias: string, details: Assignment): Submission {
        return new Submission(alias, details.id, 'IN PROGRESS...', 0, details.maxScore, new Date().getTime(), 0, 'PROGRESS', [])
    }

    private async finalChecks(submission: Submission, assignment: Assignment, token: string): Promise<Submission> {
        const [timetask, daystodeduct, status] = await this.dateutility.calculateTimeTaskAndReward(submission, assignment, token)

        submission.tasks.push(timetask)

        submission.scoreEarned = submission.tasks.reduce((sum, task) => sum + task.scoreEarned, 0)
        await this.updateUserAssignmentTable(submission, daystodeduct, status, token)
    
        return submission;
    }

    private async updateUserAssignmentTable(submission: Submission, daychange: number, status: string, token: string): Promise<void> {
        const { alias, assignmentid, scoreEarned, scoreTotal, submissionTime } = submission;
        let userassignment = await this.userassignmentservice.getUserAssignmentByAliasAndAssignment(token, alias, assignmentid);
        let create = false
        if (!userassignment) {
            create = true
            userassignment = new UserAssignment(alias, assignmentid, scoreEarned, scoreTotal, 0, 0, submissionTime, '', '');
        } else if (scoreEarned <= userassignment.scoreearned) {
            return;
        }
    
        await this.updateGradingDetails(userassignment, scoreEarned, scoreTotal, daychange, status, token, alias);
    
        if (create) {
            await this.userassignmentservice.createUserAssignment(token, alias, userassignment);
        } else {
            await this.userassignmentservice.updateUserAssignment(token, alias, userassignment);
        }
    }
    
    private async updateGradingDetails(userAssignment: UserAssignment, scoreEarned: number, scoreTotal: number, daychange: number, status: string, token: string, alias: string): Promise<void> {
        userAssignment.submitrange = status
        switch (status) {
            case "EARLY":
                userAssignment.creditreceived = "FULL";
                const daysearned = userAssignment.gracedaysearned !== 0 ? 0 : daychange
                userAssignment.gracedaysearned = userAssignment.gracedaysused !== 0 ? 0 : daysearned;
                await this.userservice.addGraceDays(alias, token, daychange);
                break;
            case "ONTIME":
                userAssignment.creditreceived = scoreEarned > 0 
                    ? (scoreEarned >= scoreTotal ? "FULL" : "PARTIAL") 
                    : "NO";
                break;
            case "LATE":
                userAssignment.creditreceived = scoreEarned > 0 
                    ? (scoreEarned >= scoreTotal ? "FULL" : "PARTIAL") 
                    : "NO";
                userAssignment.gracedaysused += daychange;
                await this.userservice.deductGraceDays(alias, token, daychange);
                break;
        }
    }
    

    protected sendsubmission (submission: Submission) {
        const response = {
            "message": submission.DTO
        }

        this.send(this.socket, JSON.stringify(response))
    }

    protected abstract operation (basesubmission: Submission, details: Assignment, files?: Files[]): Promise<Submission>
}