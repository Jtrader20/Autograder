import { ServerFacade } from "../network/ServerFacade";

export class Service {
    protected facade: ServerFacade

    public constructor() {
        this.facade = new ServerFacade()
    }
}