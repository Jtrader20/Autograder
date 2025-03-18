import express from 'express'
import SubmissionHandler from '../Handlers/SubmissionHandlers/SubmissionHandler'
import SubmissionStatTimeHandler from '../Handlers/SubmissionHandlers/SubmissionStatTimeHandler'
import SubmissionStatGaugeHandler from '../Handlers/SubmissionHandlers/SubmissionStatGaugeHandler'
import SubmissionStatAvgHandler from '../Handlers/SubmissionHandlers/SubmissionStatAvgGradeHandler'

const SUBMISSION_ROUTER = express.Router()

SUBMISSION_ROUTER.post('/', SubmissionHandler)
SUBMISSION_ROUTER.put('/stats', SubmissionStatTimeHandler)
SUBMISSION_ROUTER.post('/stats', SubmissionStatGaugeHandler)
SUBMISSION_ROUTER.post('/stats/averages', SubmissionStatAvgHandler)


export default SUBMISSION_ROUTER