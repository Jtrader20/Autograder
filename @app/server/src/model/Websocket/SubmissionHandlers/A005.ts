import { Assignment, Files, Submission, TaskDTO } from "@autograder/shared";
import { BaseSubmissionHandler } from "./BaseSubmissionHandler";

export class A005 extends BaseSubmissionHandler {
protected async operation(basesubmission: Submission, details: Assignment, files?: Files[]): Promise<Submission> {
        
        basesubmission.tasks = this.generateTasks()

        for (let i = 0; i < basesubmission.tasks.length; i++) {
            const task = basesubmission.tasks[i]

            task.status = 'PROGRESS'
            basesubmission.tasks[i] = task
            this.sendsubmission(basesubmission)

            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

            task.status = 'SUCCESS'
            task.scoreEarned = task.status === 'SUCCESS' ? task.scoreTotal : Math.random() > 0.5 ? task.scoreTotal / 2 : 0
            task.notes = task.status === 'SUCCESS' ? '' : 'Task Failed'


            basesubmission.tasks[i] = task
            this.sendsubmission(basesubmission)
        }
        
        return basesubmission
    }

     private generateTasks(): TaskDTO[] {
            return [
                {
                    status: 'WAITING',
                    title: 'Test 1',
                    scoreEarned: 0,
                    scoreTotal: 70,
                    notes: ''
                },
                {
                    status: 'WAITING',
                    title: 'Test 2',
                    scoreEarned: 0,
                    scoreTotal: 20,
                    notes: ''
                },
                {
                    status: 'WAITING',
                    title: 'Test 3',
                    scoreEarned: 0,
                    scoreTotal: 30,
                    notes: ''
                },
                {
                    status: 'WAITING',
                    title: 'Test 4',
                    scoreEarned: 0,
                    scoreTotal: 10,
                    notes: ''
                },
                {
                    status: 'WAITING',
                    title: 'Test 5',
                    scoreEarned: 0,
                    scoreTotal: 10,
                    notes: ''
                },
            ]
        }
}