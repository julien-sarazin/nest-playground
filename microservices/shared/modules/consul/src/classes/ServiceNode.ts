import { ConsulServiceOptions } from "../interfaces";

export class ServiceNode {
    public readonly id: string;
    public readonly name: string;
    public readonly protocol: string;
    public readonly prefixPath: string;
    public readonly host: string;
    public readonly port: number;

    get address() {
        const address = `${this.protocol}://${this.host}${this.port !== 80 ? `:${this.port}` : ""}${this.prefixPath}`;
        console.log("> Service node address:", address);
        return address;
    }

    constructor(configuration: ConsulServiceOptions) {
        this.id = configuration.id;
        this.name = configuration.name;
        this.protocol = configuration.protocol || "http";
        this.prefixPath = configuration.meta.prefixPath;
        this.host = configuration.address;
        this.port = configuration.port;
    }
}
