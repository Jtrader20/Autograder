export class ClientCommunicator {
    protected url: string
    protected websocket: null | WebSocket
    protected messageHandlers: Array<(data: any) => void>
    protected errorHanlders: Array<(error: any) => void>
    protected closeHandlers: Array<() => void>

    constructor(url: string) {
        this.url = url
        this.websocket = null
        this.errorHanlders = []
        this.messageHandlers = []
        this.closeHandlers = []
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.websocket) {
                console.warn("WebSocket is already connected");
                resolve();
                return;
            }
    
            this.websocket = new WebSocket(this.url);
    
            this.websocket.onopen = () => {
                console.info("WebSocket connection established");
                resolve(); 
            };
    
            this.websocket.onerror = (error) => {
                console.error("WebSocket error: ", error);
                this.errorHanlders.forEach((handler) => handler(error));
                reject(error); 
            };
    
            this.websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.messageHandlers.forEach((handler) => handler(data));
            };
    
            this.websocket.onclose = () => {
                console.warn("WebSocket connection closed");
                this.closeHandlers.forEach((handler) => handler());
                this.websocket = null;
            };
        });
    }

    send (message: any) {
        if (this.websocket && this.websocket.readyState == this.websocket.OPEN) {
            this.websocket.send(JSON.stringify(message))
        } else {
            console.warn("Cannot send message, websocket is not open")
        }
    }

    addMessageHandler(handler: (data: any) => void) {
        this.messageHandlers.push(handler)
    }

    addErrorHandler(handler: (error: any) => void) {
        this.errorHanlders.push(handler)
    }

    addCloseHandler(handler: () => void) {
        this.closeHandlers.push(handler)
    }

    close () {
        if (this.websocket) {
            this.websocket.close()
        }
    }


}