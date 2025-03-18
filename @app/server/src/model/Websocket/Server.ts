import { A001 } from "./SubmissionHandlers/A001"
import { A002 } from "./SubmissionHandlers/A002"
import { A003 } from "./SubmissionHandlers/A003"
import { A004 } from "./SubmissionHandlers/A004"
import { A005 } from "./SubmissionHandlers/A005"
import WS from "./websocket"

export default class WSserver extends WS {
    public async handlemessage(ws: import("ws"), message: string): Promise<void> {
        const data = JSON.parse(message)
        const id = data['message']['id']
        const submissioninfo = data['message']['submissioninfo']

        switch (id) {
            case 'A001':
                const A1 = new A001(ws, this.send)
                await A1.handler(submissioninfo)
                break
            case 'A002':
                const A2 = new A002(ws, this.send)
                await A2.handler(submissioninfo)
                break
            case 'A003':
                const A3 = new A003(ws, this.send)
                await A3.handler(submissioninfo)
                break
            case 'A004':
                const A4 = new A004(ws, this.send)
                await A4.handler(submissioninfo)
                break
            case 'A005':
                const A5 = new A005(ws, this.send)
                await A5.handler(submissioninfo)
                break
        }
        this.close(ws)
    }
}