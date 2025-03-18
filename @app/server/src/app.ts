import express from 'express'

import AUTH_ROUTER from './model/Routes/AuthRouter';
import USER_ROUTER from './model/Routes/UserRouter';
import ASSIGNMENT_ROUTER from './model/Routes/AssignmentRouter'
import SUBMISSION_ROUTER from './model/Routes/SubmissionRouter';
import USERASSIGNMENT_ROUTER from './model/Routes/UserAssignmentRouter';

const APP = express()

APP.use(express.json())
APP.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});


APP.use('/api/auth', AUTH_ROUTER)
APP.use('/api/user', USER_ROUTER)
APP.use('/api/grader', ASSIGNMENT_ROUTER)
APP.use('/api/submission', SUBMISSION_ROUTER)
APP.use('/api/userassignment', USERASSIGNMENT_ROUTER)

APP.get('/', (req, res) => {
    res.json({ message: 'Autograder Service' })
})

export default APP