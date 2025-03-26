import WS from "./websocket"
import fs from 'fs'
import path from 'path'
import WebSocket, { Server } from 'ws';

export default class WSserver extends WS {

    private handlers: Map<string, any> = new Map()
    private handlersDir = path.resolve(__dirname, "./SubmissionHandlers")

    constructor(wss: Server) {
        super(wss)
        this.loadHandlers()
        this.watchHandlers()
    }

    private async loadHandlers() {
        this.handlers.clear()
        const files = fs.readdirSync(this.handlersDir)
        for (const file of files) {
            if (file.endsWith(".ts") || file.endsWith(".js")) {
                const id = path.basename(file, path.extname(file))
                const modulePath = path.join(this.handlersDir, file)
                delete require.cache[require.resolve(modulePath)]
                const HandlerClass = require(modulePath).default || require(modulePath)
                this.handlers.set(id, HandlerClass)
            }
        }
    }

    private watchHandlers() {
        fs.watch(this.handlersDir, (eventType, filename) => {
            if (filename) {
                this.loadHandlers()
            }
        })
    }

    public async handlemessage(ws: WebSocket, message: string): Promise<void> {
        const data = JSON.parse(message);
        const id = data["message"]["id"]
        const submissioninfo = data["message"]["submissioninfo"]

        const HandlerClass = this.handlers.get(id)
        if (HandlerClass) {
            const instance = new HandlerClass[id](ws, this.send)
            await instance.handler(submissioninfo)
        } else {
            console.warn('No handler found')
        }

        this.close(ws)
    }
}