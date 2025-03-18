import WebSocket, { Server } from 'ws';

export default abstract class WS {
    protected wss: Server
    constructor(wss: Server) {
        this.wss = wss
    }

    public setup(): void {
        this.wss.on('connection', (ws: WebSocket) => {
            ws.on('message', async (message: string) => {
                this.handlemessage(ws, message)
            })
            ws.on('close', () => {})
        })
    }

    public send(socket: WebSocket, message: string): void {
        if (socket.readyState === WebSocket.OPEN) socket.send(message)
    }

    public close(socket: WebSocket): void {
        if (socket.readyState === WebSocket.OPEN) socket.close()
    }

    public abstract handlemessage(ws: WebSocket, message: string): void
}