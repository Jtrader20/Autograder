import { Response } from 'express'

enum StatusTypes {
    BAD_REQUEST = 400,
    SERVER_ERROR = 500
}

const generalHandler = async (res: Response, handlerOperation: () => Promise<void>): Promise<void>  => {
    try {
        await handlerOperation()
    } catch (error) {
        console.log((error as Error).message)
        let statusCode = StatusTypes.SERVER_ERROR
        let message = "Internal Server Error"

        const regex: RegExp = /\[(\d+)\] (.+)/
        const match = (error as Error).message.match(regex)

        if (match) {
            statusCode = parseInt(match[1])
            message = match[2]
        }

        res.status(statusCode).json({ error: message })
    }
}

export { generalHandler, StatusTypes }