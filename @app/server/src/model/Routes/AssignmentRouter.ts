import express from 'express'
import AssignmentHandler from '../Handlers/AssignmentHandlers/AssignmentsHandler'

const ASSIGNMENT_ROUTER = express.Router()

ASSIGNMENT_ROUTER.post('/', AssignmentHandler)

export default ASSIGNMENT_ROUTER