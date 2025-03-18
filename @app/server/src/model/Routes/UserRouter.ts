import express from 'express'
import UserListHandler from '../Handlers/UserHandlers/UserListHandler'

const USER_ROUTER = express.Router()

USER_ROUTER.post('/', UserListHandler)

export default USER_ROUTER