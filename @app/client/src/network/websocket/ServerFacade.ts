import config from "../../config";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
    constructor() {}

    submit(request: any, onUpdate: (data: any) => void, onError: (error: any) => void, onClose: () => void) {
        console.log("URL: ", config.websocketPath);
        const client: ClientCommunicator = new ClientCommunicator(config.websocketPath);
    
        client.connect()
            .then(() => {
                console.log("WebSocket is now open. Sending message...");
                client.addMessageHandler(onUpdate);
                client.addErrorHandler(onError);
                client.addCloseHandler(onClose);
                client.send(request); 
            })
            .catch((error) => {
                console.error("WebSocket failed to connect:", error);
            });
    
        return client;
    }
    
}