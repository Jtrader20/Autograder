import { createServer } from 'http'
import { DB } from './model/DAO/implementation/database/SQLDatabase'
import APP from './app'
import { WebSocketServer } from 'ws'
import Wsserver from './model/Websocket/Server'

const PORT = process.env.PORT || 4000

async function start() {
    try {
        console.log("Initializing database ------")
        await DB.initialized
        console.log("Database initalized. Starting server")

        const SERVER = createServer(APP)
        const WSS = new WebSocketServer({ server: SERVER })
        const websocketserver = new Wsserver(WSS)

        websocketserver.setup()

        SERVER.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
        
    } catch (error) {
        console.error('Failed to start server:', (error as Error).message)
    }
}

start()