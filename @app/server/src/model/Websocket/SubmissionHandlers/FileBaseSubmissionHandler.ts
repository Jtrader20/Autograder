import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { BaseSubmissionHandler } from "./BaseSubmissionHandler";
import path from 'path'
import fs from 'fs'
import { Submission } from "@autograder/shared";

export abstract class FileBaseSubmissionHandler extends BaseSubmissionHandler {
    public submissiondirectory: string = ''

    public async rundockertests(basesubmission: Submission): Promise<Submission> {
        try {
            this.submissiondirectory = this.createsubmissiondirectory()
            this.writedockerfile()
            this.displaypretestsubmissioninfo(basesubmission)
            await this.builddockerimage()
            const result = await this.rundockercontainer()
            const submission = this.handleoutput(result, this.submissiondirectory, basesubmission)
            this.cleanup()
            return submission
        } catch (error) {
            console.error('Error during test execution:', error)
            throw new Error((error as Error).message)
        }
    }

    private cleanup(): void {
        fs.rmSync(this.submissiondirectory, { recursive: true })
    }

    private async rundockercontainer(): Promise<object> {
        return new Promise((resolve, reject) => {
            const stdoutFile = path.join(this.submissiondirectory, 'stdout.log');
            const stderrFile = path.join(this.submissiondirectory, 'stderr.log');
    
            const stdoutStream = fs.createWriteStream(stdoutFile);
            const stderrStream = fs.createWriteStream(stderrFile);
    
            const dockercommand = [
                'docker', 'run', '--rm',
                '--memory=256m', '--cpus=0.5',
                'test-runner-sandbox'
            ];
    
            const child = spawn(dockercommand[0], dockercommand.slice(1));
    
            child.stdout.pipe(stdoutStream);
            child.stderr.pipe(stderrStream);
    
            child.on('exit', async (code) => {
                stdoutStream.end();
                stderrStream.end();
    
                if (code !== 0) {
                    return reject(`Docker command failed with exit code ${code}, check ${stderrFile}`);
                }
    
                try {
                    const stdoutData = fs.readFileSync(stdoutFile, 'utf-8');
                    const parsed = JSON.parse(stdoutData);
                    resolve(parsed);
                } catch (error) {
                    reject(`Failed to parse JSON output: ${(error as Error).message}`);
                }
            });
    
            child.on('error', (error) => {
                reject(`Error executing Docker command: ${error.message}`);
            });
        });
    }
    

    private writedockerfile(): void {
        const dockerfilecontent = this.getdockerfilecontent()
        const dockerfilepath = path.resolve(this.submissiondirectory, 'Dockerfile')
        fs.writeFileSync(dockerfilepath, dockerfilecontent)
    }

    private async builddockerimage(): Promise<void> {
        return new Promise((resolve, reject) => {
            const buildCommand = [
                'docker', 'build', '-t', 'test-runner-sandbox', '-f', path.resolve(this.submissiondirectory, 'Dockerfile'), this.submissiondirectory
            ]

            const build: ChildProcessWithoutNullStreams = spawn(buildCommand[0], buildCommand.slice(1))

            let buildstout = ''
            let buildsterr = ''

            build.stdout.on('data', (data) => {
                buildstout += data.toString()
            })

            build.stderr.on('data', (data) => {
                buildsterr += data.toString()
            })

            build.on('exit', (code) => {
                if (code !== 0) {
                    return reject(`Docker build failed with exit code ${code}\n${buildsterr}`)
                }

                console.log('Docker image built successfully')
                resolve()
            })

            build.on('error', (error) => {
                reject(`Error executing Docker build command ${error.message}`)
            })
        })
    }

    protected getsubmissiondirectory(): string {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        return path.resolve(__dirname, 'submissions', timestamp)
    }

    protected createsubmissiondirectory(): string {
        const submissiondir = this.getsubmissiondirectory()
        fs.mkdirSync(submissiondir, {recursive: true})
        
        const sandboxdir = path.resolve(__dirname, 'sandbox')
        fs.readdirSync(sandboxdir).forEach(file => {
            const filepath = path.resolve(sandboxdir, file)
            const destination = path.resolve(submissiondir, file)
            fs.copyFileSync(filepath, destination)
        })

        this.copytestfiles(submissiondir)
        return submissiondir
    }

    protected abstract getdockerfilecontent(): string
    protected abstract copytestfiles(submissiondir: string): void
    protected abstract handleoutput(result: any, directory: string, basesubmission: Submission): Submission
    protected abstract displaypretestsubmissioninfo(basesubmission: Submission): void
}