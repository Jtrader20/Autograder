import express from 'express'
import RegisterHandler from '../Handlers/UserHandlers/RegisterHandler'
import LogoutHandler from '../Handlers/UserHandlers/LogoutHandler'
import LoginHandler from '../Handlers/UserHandlers/LoginHandler'

const AUTH_ROUTER = express.Router()

AUTH_ROUTER.post('/', RegisterHandler)
AUTH_ROUTER.delete('/', LogoutHandler)
AUTH_ROUTER.put('/', LoginHandler)

export default AUTH_ROUTER