import { AutograderRequest, AutograderResponse } from "@autograder/shared"

export class ClientCommunicator {
    private SERVER_URL: string

    public constructor(SERVER_URL: string) {
        this.SERVER_URL = SERVER_URL
    }

    public async doPost<REQ extends AutograderRequest, RES extends AutograderResponse> (req: REQ | undefined, endpoint: string, headers?: Headers): Promise<RES> {
        return this.doRequest<REQ, RES>("POST", req, endpoint, headers)
    }

    public async doDelete<REQ extends AutograderRequest, RES extends AutograderResponse> (req: REQ | undefined, endpoint: string, headers?: Headers): Promise<RES> {
        return this.doRequest<REQ, RES>("DELETE", req, endpoint, headers)
    }

    public async doPut<REQ extends AutograderRequest, RES extends AutograderResponse> (req: REQ | undefined, endpoint: string, headers?: headers): Promsie<RES> {
        return this.doRequest<REQ, RES>("PUT", req, endpoint, headers)
    }

    private async doRequest<REQ extends AutograderRequest, RES extends AutograderResponse> (method: string, req: REQ | undefined, endpoint: string, headers?: Headers): Promise<RES> {
        if (headers && req) {
            headers.append("Content-type", "application/json")
        } else if (req) {
            headers = new Headers({
                "Content-type": "application/json"
            })
        }
        
        const url = this.getUrl(endpoint)
        const params = this.getParams(method, headers, req ? JSON.stringify(req) : req)

        try {
            const resp: Response = await fetch(url, params)

            if (resp.ok) {
                const response: RES = await resp.json()
                return response;
            } else {
                const error = await resp.json()
                throw new Error(error.errorMessage)
            }
        } catch (error) {
            console.error(error)
            throw new Error(`Client communicator ${params.method} failed\n${(error as Error).message}`)
        }
    }

    private getUrl(endpoint: string) {
        return this.SERVER_URL + endpoint
    }

    private getParams(method: string, headers?: Headers, body?: BodyInit): RequestInit {
        const params: RequestInit = { method: method }

        if (headers) {
            params.headers = headers
        }

        if (body) {
            params.body = body
        }

        return params
    }
}