import { Submission, Assignment, Files, TaskDTO } from "@autograder/shared";
import { FileBaseSubmissionHandler } from "./FileBaseSubmissionHandler";
import path from "path";
import fs from 'fs'

export class A003 extends FileBaseSubmissionHandler {
    protected stopOnFailureIndicies: Set<number> = new Set([])
    protected files: Files[] = []

    protected async operation(basesubmission: Submission, details: Assignment, files: Files[]): Promise<Submission> {
        basesubmission.tasks = this.createTasks()
        this.files = files
        
        const submission = await this.rundockertests(basesubmission)
        return submission
    }

    protected handleoutput(output: any, directory: string, submission: Submission): Submission {
        if (directory) {
            fs.writeFileSync(path.join(directory, 'results.txt'), JSON.stringify(output))
        } else {
            console.log('cannot find directory')
        }

        const testResults = output['testResults']
        const assertionResults = testResults[0]['assertionResults']

        for (let i = 0; i < assertionResults.length; i ++) {
            const status = assertionResults[i]['status']
            const task = submission.tasks[i]

            task.status = status == 'passed'? 'SUCCESS' : 'FAILED'
            task.scoreEarned = status == 'passed' ? task.scoreTotal : 0
            task.notes = status == 'passed' ? '': 'Output did not match what is expected'

            submission.tasks[i] = task
        }

        submission.title = 'Attempt Complete'

        return submission
    }

    protected copytestfiles(submissiondir: string): void {
        // Copy main test file
        const testfile = path.resolve(__dirname, 'tests', 'A003.test.js')
        fs.copyFileSync(testfile, path.resolve(submissiondir, 'A003.test.js'))

        // Write code files
        for (const file of this.files) {
            if (!file.name.endsWith('.test.js')) {
                fs.writeFileSync(path.join(submissiondir, file.name), file.content)
            }
        }
    }

    protected getdockerfilecontent(): string {
        let codestr = ''
        for (const file of this.files) {
            if(!file.name.endsWith('.test.js')) {
                codestr += `COPY ${file.name} /sandbox/${file.name}\n`
            }
        }

        const dockerfilecontent = `
        # Base image
        FROM node:18-alpine

        # Set working directory
        WORKDIR /sandbox

        # Install Jest
        RUN npm install --global jest

        # Copy test runner script and config
        COPY runTests.js /sandbox/runTests.js
        COPY jest.config.js /sandbox/jest.config.js

        # Copy test script
        COPY A003.test.js /sandbox/A003.test.js
    
        # Copy code files
        ${codestr}

        # Default command
        CMD ["node", "/sandbox/runTests.js"]
        `

        return dockerfilecontent
    }

    protected displaypretestsubmissioninfo(submission: Submission): void {
        submission.tasks.forEach((task) => {
            task.status = 'PROGRESS'
        })

        submission.title = 'Tests in progress'
        this.sendsubmission(submission)
    }

    private createTasks(): TaskDTO[] {
        return [
            {
                status: 'WAITING',
                title: 'Train Test 1',
                scoreEarned: 0,
                scoreTotal: 24,
                notes: '',
            },
            {
                status: 'WAITING',
                title: 'Train Test 2',
                scoreEarned: 0,
                scoreTotal: 24,
                notes: '',
            },
            {
                status: 'WAITING',
                title: 'Train Test 3',
                scoreEarned: 0,
                scoreTotal: 24,
                notes: '',
            },
            {
                status: 'WAITING',
                title: 'Train Test 3',
                scoreEarned: 0,
                scoreTotal: 24,
                notes: '',
            },
            {
                status: 'WAITING',
                title: 'Train Test 3',
                scoreEarned: 0,
                scoreTotal: 24,
                notes: '',
            }
        ]
    }
}