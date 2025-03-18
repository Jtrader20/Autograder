
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
        COPY train.js /sandbox/train.js


        # Default command
        CMD ["node", "/sandbox/runTests.js"]
        