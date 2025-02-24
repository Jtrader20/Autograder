import express from 'express'

import AUTH_ROUTER from './model/Routes/AuthRouter';

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

APP.get('/', (req, res) => {
    res.json({ message: 'Autograder Service' })
})

export default APP