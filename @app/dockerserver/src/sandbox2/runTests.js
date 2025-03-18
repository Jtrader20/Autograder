const { execSync } = require('child_process')
const fs = require('fs')

async function runTests() {
    try {
        // Run Jest inside the container with the provided config
        const result = execSync("npx jest --config=jest.config.js --json --outputFile=jest-results.json", { encoding: "utf-8" })


        // Read the jest-results.json file and log it
        const jestResults = fs.readFileSync('jest-results.json', 'utf-8')
        console.log(jestResults)

    } catch (error) {
        // Handle error and print the full error message
        console.error("Test execution failed: ", error.message)
        if (error.stderr) {
            console.error("stderr:", error.stderr)
        }
        if (error.stdout) {
            console.error("stdout:", error.stdout)
        }
    }
}

runTests();
