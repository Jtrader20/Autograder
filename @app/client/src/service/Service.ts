import { ServerFacade } from "../network/http/ServerFacade";

export class Service {
    protected facade: ServerFacade

    public constructor() {
        this.facade = new ServerFacade()
    }
}