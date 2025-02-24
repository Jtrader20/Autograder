import { createServer } from 'http'
import { DB } from './model/DAO/implementation/database/SQLDatabase'
import APP from './app'

const PORT = process.env.PORT || 4000

async function start() {
    try {
        console.log("Initializing database ------")
        await DB.initialized
        console.log("Database initalized. Starting server")

        const SERVER = createServer(APP)
        SERVER.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server:', (error as Error).message)
    }
}

start()