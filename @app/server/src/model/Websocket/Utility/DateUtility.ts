import { Assignment, Submission, TaskDTO, UserAssignment } from "@autograder/shared";
import { UserAssignmentService } from "../../Service/UserAssignmentService";
import { UserService } from "../../Service/UserService";

enum DAY_OF_WEEK {
    SUNDAY = 0,
    MONDAY = 1,
    TUESDAY = 2,
    WEDNESDAY = 3,
    THURSDAY = 4,
    FRIDAY = 5,
    SATURDAY = 6
}

export class DateUtility {
    private _userassignmentservice: UserAssignmentService
    private _userservice: UserService
    private _excludedays: DAY_OF_WEEK[] = [DAY_OF_WEEK.SUNDAY]

    public constructor (userassignmentservice: UserAssignmentService, userservice: UserService) {
        this._userassignmentservice = userassignmentservice
        this._userservice = userservice
    }

    protected get userassignmentservice(): UserAssignmentService {
        return this._userassignmentservice
    }

    protected get userservice(): UserService {
        return this._userservice
    }

    protected get excludedays(): DAY_OF_WEEK[] {
        return this._excludedays
    }

    public async calculateTimeTaskAndReward(submission: Submission, assignment: Assignment, token: string): Promise<[TaskDTO, number, string]> {
        const { daysLate, daysEarly } = this.calculateDaysDifference(submission, assignment);
        submission.scoreEarned = submission.tasks.reduce((sum, task) => sum + task.scoreEarned, 0)
        if (this.isEarlySubmission(submission, daysEarly)) return await this.handleEarlySubmission(submission, token, daysEarly);
        if (this.isOntimeSubmission(submission, daysLate)) return this.handleOntimeSubmission();
        return await this.handleLateSubmission(submission, token, daysLate);
    }

    private async getGraceDaysUsedOnAssignment(alias: string, token: string, assignmentid: string): Promise<number> {
        const userassignment: UserAssignment | null = await this.userassignmentservice.getUserAssignmentByAliasAndAssignment(token, alias, assignmentid)
        if (!userassignment) return 0
        return userassignment.gracedaysearned
    }

    private async getHighestScore(alias: string, token: string, assignmentid: string): Promise<number> {
        const userassignment: UserAssignment | null = await this.userassignmentservice.getUserAssignmentByAliasAndAssignment(token, alias, assignmentid)
        if (!userassignment) return 0
        return userassignment.scoreearned
    }
    
    private async handleLateSubmission(submission: Submission, token: string, daysLate: number): Promise<[TaskDTO, number, string]> {
        const task = this.generateTask();
        const alias: string = submission.alias;
        const assignmentid: string = submission.assignmentid;
        
        const usergracedaysremaining: number = await this.userservice.getUserLateDaysRemaining(alias, token);
        const gracedaysusedonassignment: number = await this.getGraceDaysUsedOnAssignment(alias, token, assignmentid);
        const currenthighscore: number = await this.getHighestScore(alias, token, assignmentid)
        
        const totalgracedaysavailable = usergracedaysremaining + gracedaysusedonassignment;
    
        let status = "LATE";
        let daysToDeduct = 0;

        const totalScore = submission.tasks.reduce((sum, task) => sum + task.scoreEarned, 0);

        task.status = 'FAILED'
        if (totalScore === 0) {
            task.notes = "Late submission received but no score earned. No grace days deducted.";
            task.scoreEarned = 0;
            return [task, 0, status];
        }

        if (currenthighscore >= totalScore) {
            task.notes = "Late submission recieved but higher score not earned. No grace days deducted."
            task.scoreEarned = 0;
            return [task, 0, status]
        }
    
        // Only go through these cases if the submission would have gained a better score than previously earned
        if (totalgracedaysavailable < daysLate && gracedaysusedonassignment === 0) {
            // Case 1: Not enough grace days, no grace days used before → zero score, no deduction
            task.notes = "Late submission. No grace days left. Score is 0.";
            task.scoreEarned = -totalScore;
        } else if (gracedaysusedonassignment >= daysLate) {
            // Case 2: User already used grace days exactly equal to daysLate → get score
            task.notes = "Grace days previously used cover lateness. No additional deduction.";
            task.scoreEarned = 0;
        } else if (totalgracedaysavailable >= daysLate) {
            // Case 3: Use grace days to cover lateness
            daysToDeduct = daysLate - gracedaysusedonassignment;
            task.notes = `Using ${daysToDeduct} grace days to cover late submission.`;
            task.scoreEarned = 0;
        } else {
            // Case 4: Not enough total grace days → Do NOT deduct any grace days, score is 0
            task.notes = "Late submission. Not enough grace days to cover, score is 0. No grace days deducted.";
            task.scoreEarned = -totalScore;
            daysToDeduct = 0;
        }
    
        return [task, daysToDeduct, status];
    }
    

    private static readonly MAX_REWARD = 5

    private calculateReward(daysEarly: number): number {
        return Math.min(daysEarly, DateUtility.MAX_REWARD);
    }

    private async alreadyReceivedReward(submission: Submission, token: string): Promise<boolean> {
        const alias = submission.alias
        const assignmentid = submission.assignmentid
        const userassignment: UserAssignment | null = await this.userassignmentservice.getUserAssignmentByAliasAndAssignment(token, alias, assignmentid)
        if (!userassignment) return false
        return userassignment.gracedaysearned > 0
    }

    private async handleEarlySubmission(submission: Submission, token: string, daysEarly: number): Promise<[TaskDTO, number, string]> {
        const task = this.generateTask();
        let reward = 0;
    
        if (!await this.alreadyReceivedReward(submission, token)) {
            reward = this.calculateReward(daysEarly);
            task.notes = `Reward given: ${reward} extra grace days`;
        } else {
            task.notes = 'Reward already received';
        }
        task.title = 'Early:'
        task.status = 'SUCCESS';
        task.scoreEarned = 0;
        return [task, reward, 'EARLY'];
    }
    

    private handleOntimeSubmission(): [TaskDTO, number, string] {
        const task = this.generateTask()
        task.status = 'SUCCESS'
        task.scoreEarned = 0
        task.title = 'On Time:'
        task.notes = 'No reward given'
        return [task, 0, 'ONTIME']
    }

    private generateTask() {
        return {
            status: '',
            title: '',
            scoreEarned: 0,
            scoreTotal: 0,
            notes: ''
        }
    }

    private isEarlySubmission(submission: Submission, daysEarly: number): boolean {
        return daysEarly > 0 && (submission.scoreEarned >= submission.scoreTotal);
    }
    
    private isOntimeSubmission(submission: Submission, daysLate: number): boolean {
        return daysLate === 0 || (daysLate < 0 && submission.scoreEarned < submission.scoreTotal);
    }
    
    private calculateDaysDifference(submission: Submission, assignment: Assignment): { daysLate: number, daysEarly: number } {
        const duedate = new Date(assignment.dueDate);
        const submitdate = new Date(submission.submissionTime);

        let daysLate = 0;
        let daysEarly = 0;
        const oneday = 1000 * 60 * 60 * 24;

        if (submitdate < duedate) {
            for (let date = new Date(submitdate); date < duedate; date = new Date(date.getTime() + oneday)) {
                if (!this.excludedays.includes(date.getDay())) {
                    daysEarly++;
                }
            }
        } else if (submitdate > duedate) {
            for (let date = new Date(duedate); date < submitdate; date = new Date(date.getTime() + oneday)) {
                if (!this.excludedays.includes(date.getDay())) {
                    daysLate++;
                }
            }
        }

        return { daysLate, daysEarly };
    }

}