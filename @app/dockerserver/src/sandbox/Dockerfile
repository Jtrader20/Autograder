# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /sandbox

# Install Jest
RUN npm install --global jest jest-junit

# Copy test script
COPY sandbox/runTests.js /sandbox/runTests.js
COPY sandbox/jest.config.js /sandbox/jest.config.js

COPY tests/test.test.js /sandbox/test.test.js
COPY uploads/car.js /sandbox/car.js

# Default command (overridden by the main app)
CMD ["node", "/sandbox/runTests.js"]
