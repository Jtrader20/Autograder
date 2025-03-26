import express from 'express'
import UserListHandler from '../Handlers/UserHandlers/UserListHandler'
import GraceDaysUpdateHandler from '../Handlers/UserHandlers/GraceDaysUpdateHandler'

const USER_ROUTER = express.Router()

USER_ROUTER.post('/', UserListHandler)
USER_ROUTER.put('/', GraceDaysUpdateHandler)

export default USER_ROUTER