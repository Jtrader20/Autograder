import path from 'path'
import fs from 'fs'
import { spawn } from 'child_process'

const SANDBOX_IMAGE = "test-runner-sandbox"

// Function to create a unique submission directory
function getSubmissionDirectory(): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return path.resolve(__dirname, 'submissions', timestamp);
}

// Step 1: Create the submission directory and copy necessary files
function createSubmissionDirectory(): string {
    const submissionDir = getSubmissionDirectory();
    fs.mkdirSync(submissionDir, { recursive: true });

    // Copy sandbox files to the new directory
    const sandboxDir = path.resolve(__dirname, 'sandbox2');
    fs.readdirSync(sandboxDir).forEach(file => {
        const filePath = path.resolve(sandboxDir, file);
        const destination = path.resolve(submissionDir, file);
        fs.copyFileSync(filePath, destination);
    });

    // Copy tests and uploads files to the submission directory
    const testFile = path.resolve(__dirname, 'tests', 'test.test.js');
    const codeFile = path.resolve(__dirname, 'uploads', 'car.js');
    fs.copyFileSync(testFile, path.resolve(submissionDir, 'test.test.js'));
    fs.copyFileSync(codeFile, path.resolve(submissionDir, 'car.js'));

    return submissionDir;
}

// Step 2: Write the Dockerfile in the new directory
function writeDockerfile(submissionDir: string): void {
    const dockerfileContent = `
        # Base image
        FROM node:18-alpine

        # Set working directory
        WORKDIR /sandbox

        # Install Jest
        RUN npm install --global jest

        # Copy test script
        COPY runTests.js /sandbox/runTests.js
        COPY jest.config.js /sandbox/jest.config.js

        COPY test.test.js /sandbox/test.test.js
        COPY car.js /sandbox/car.js

        # Default command (overridden by the main app)
        CMD ["node", "/sandbox/runTests.js"]


    `;

    const dockerfilePath = path.resolve(submissionDir, 'Dockerfile');
    fs.writeFileSync(dockerfilePath, dockerfileContent);
}

// Step 3: Build the Docker image
function buildDockerImage(submissionDir: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const buildCommand = [
            'docker', 'build', '-t', 'test-runner-sandbox', '-f', path.resolve(submissionDir, 'Dockerfile'), submissionDir
        ];

        const buildProcess = spawn(buildCommand[0], buildCommand.slice(1));

        let buildStdout = '';
        let buildStderr = '';

        buildProcess.stdout.on('data', (data) => {
            buildStdout += data.toString();
            console.log('Docker Build Output:', data.toString());
        });

        buildProcess.stderr.on('data', (data) => {
            buildStderr += data.toString();
            console.error('Docker Build Errors:', data.toString());
        });

        buildProcess.on('exit', (code) => {
            if (code !== 0) {
                return reject(`Docker build failed with exit code ${code}\n${buildStderr}`);
            }

            console.log('Docker image built successfully.');
            resolve();
        });

        buildProcess.on('error', (error) => {
            reject(`Error executing Docker build command: ${error.message}`);
        });
    });
}

// Step 4: Run the Docker container and return the JSON result

function runDockerContainer(): Promise<object> {
    return new Promise((resolve, reject) => {
        const dockerCommand = [
            'docker', 'run', '--rm',
            '--memory=256m', '--cpus=0.5',
            'test-runner-sandbox'
        ];

        const child = spawn(dockerCommand[0], dockerCommand.slice(1));

        let stdoutData = '';
        let stderrData = '';

        // Capture stdout
        child.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });

        // Capture stderr
        child.stderr.on('data', (data) => {
            stderrData += data.toString();
        });

        // Handle process exit
        child.on('exit', (code) => {
            if (code !== 0) {
                reject(`Docker command failed with exit code ${code}\n${stderrData}`);
            } else {
                try {
                    // Attempt to parse stdout as JSON
                    // console.log('stdout Data: ', stdoutData)
                    // console.error('stderror data: ', stderrData)
                    const parsed = JSON.parse(stdoutData)
                    resolve(parsed);
                } catch (error) {
                    reject(`Failed to parse Jest output as JSON: ${(error as Error).message}\nRaw Output:\n${stdoutData}`);
                }
            }
        });

        // Handle any process errors
        child.on('error', (error) => {
            reject(`Error executing Docker command: ${error.message}`);
        });
    });
}


// Cleanup: Remove the submission folder after execution
function cleanup(submissionDir: string): void {
    fs.rmdirSync(submissionDir, { recursive: true });
    console.log('Cleaned up submission directory:', submissionDir);
}

// Main function that orchestrates everything
export async function runTests(): Promise<object> {
    try {
        const submissionDir = createSubmissionDirectory();
        writeDockerfile(submissionDir);

        // Build the Docker image
        await buildDockerImage(submissionDir);

        // Run the Docker container and get the JSON result
        const result = await runDockerContainer();

        // Clean up after execution
        cleanup(submissionDir);

        return result;  // Return the JSON result from Jest

    } catch (error) {
        console.error('Error during test execution:', error);
        throw error;
    }
}
