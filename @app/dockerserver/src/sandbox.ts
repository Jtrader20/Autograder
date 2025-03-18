import path from 'path'
import fs from 'fs'
import { spawn } from 'child_process'

const SANDBOX_IMAGE = "test-runner-sandbox"

export async function runTests(): Promise<string> {
    return new Promise((resolve, reject) => {
        const testFile = path.resolve(__dirname, "tests", "test.test.js")
        const codeFile = path.resolve(__dirname, "uploads", "car.js")
        
        const dockerfile = `
            # Base image
            FROM node:18-alpine

            # Set working directory
            WORKDIR /sandbox

            # Install Jest
            RUN npm install --global jest

            # Copy test script
            COPY sandbox/runTests.js /sandbox/runTests.js
            COPY sandbox/jest.config.js /sandbox/jest.config.js

            COPY tests/test.test.js /sandbox/test.test.js
            COPY uploads/car.js /sandbox/car.js

            # Default command (overridden by the main app)
            CMD ["node", "/sandbox/runTests.js"]
        `

        // Check if files exist
        if (!fs.existsSync(testFile) || !fs.existsSync(codeFile)) {
            return reject("Missing test file or code file")
        }

        // Set the Docker command and its arguments
        const dockerCommand = [
            'docker', 'run', '--rm',
            '--memory=256m', '--cpus=0.5',  // Remove the quotes around 0.5
            SANDBOX_IMAGE
        ]

        // Spawn the Docker process
        const child = spawn(dockerCommand[0], dockerCommand.slice(1))

        let stdoutData = ''
        let stderrData = ''

        // Capture stdout from the Docker container
        child.stdout.on('data', (data) => {
            stdoutData += data.toString()
            console.log('Docker Output:', data.toString())
        })

        // Capture stderr from the Docker container
        child.stderr.on('data', (data) => {
            stderrData += data.toString()
            console.error('Docker Errors:', data.toString())
        })

        // Handle process exit
        child.on('exit', (code) => {
            if (code !== 0) {
                reject(`Docker command failed with exit code ${code}\n${stderrData}`)
            } else {
                resolve(stdoutData)  // Resolve with stdout data
            }
        })

        // Handle any errors with the child process
        child.on('error', (error) => {
            reject(`Error executing Docker command: ${error.message}`)
        })
    })
}
