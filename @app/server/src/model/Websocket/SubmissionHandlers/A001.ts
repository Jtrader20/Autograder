import { Submission, Assignment, TaskDTO } from "@autograder/shared";
import { BaseSubmissionHandler } from "./BaseSubmissionHandler";

export class A001 extends BaseSubmissionHandler {
    protected async operation(basesubmission: Submission, details: Assignment): Promise<Submission> {
        
        basesubmission.tasks = this.generateTasks()

        for (let i = 0; i < basesubmission.tasks.length - 1; i++) {
            const task = basesubmission.tasks[i]

            task.status = 'PROGRESS'
            basesubmission.tasks[i] = task
            this.sendsubmission(basesubmission)

            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

            task.status = Math.random() > 0.3 ? 'SUCCESS' : 'FAILED'
            task.scoreEarned = task.status === 'SUCCESS' ? task.scoreTotal : Math.random() > 0.5 ? task.scoreTotal / 2 : 0
            task.notes = task.status === 'SUCCESS' ? '' : 'Task Failed'


            basesubmission.tasks[i] = task
            this.sendsubmission(basesubmission)
        }

        const ecindex = basesubmission.tasks.length - 1
        const task = basesubmission.tasks[ecindex]
        task.status = 'PROGRESS'
        basesubmission.tasks[ecindex] = task
        this.sendsubmission(basesubmission)

        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

        task.status = Math.random() > 0.2 ? 'SUCCESS' : 'FAILED'
        task.scoreEarned = task.status === 'SUCCESS' ? 5 : 0
        task.notes = task.status === 'SUCCESS' ? 'Extra credit earned': ''
        basesubmission.tasks[ecindex]

        this.sendsubmission(basesubmission)
        return basesubmission
    }


    private generateTasks(): TaskDTO[] {
        return [
            {
                status: 'WAITING',
                title: 'Test 1',
                scoreEarned: 0,
                scoreTotal: 25,
                notes: ''
            },
            {
                status: 'WAITING',
                title: 'Test 2',
                scoreEarned: 0,
                scoreTotal: 25,
                notes: ''
            },
            {
                status: 'WAITING',
                title: 'Test 3',
                scoreEarned: 0,
                scoreTotal: 25,
                notes: ''
            },
            {
                status: 'WAITING',
                title: 'Test 4',
                scoreEarned: 0,
                scoreTotal: 25,
                notes: ''
            },
            {
                status: 'WAITING',
                title: 'Extra Credit 1',
                scoreEarned: 0,
                scoreTotal: 0,
                notes: ''
            },
        ]
    }
}