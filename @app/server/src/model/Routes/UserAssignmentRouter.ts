import express from 'express'
import AllUserAssignmentsHandler from '../Handlers/UserAssignmentHandlers/AllUserAssignmentsHandler'

const USERASSIGNMENT_ROUTER = express.Router()

USERASSIGNMENT_ROUTER.post('/', AllUserAssignmentsHandler)

export default USERASSIGNMENT_ROUTER