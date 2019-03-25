import { ServiceConfiguration } from "../interfaces/service-configuration.interface";
import Axios, { AxiosRequestConfig } from "axios";
import * as path from "path";
import * as Consul from "consul";

export class RemoteService {
    private nodes: ServiceConfiguration[];

    constructor(
      private readonly consul: Consul.Consul,
      private readonly serviceName: String) {
        this.watchNodes();
    }

    private watchNodes(): void {
        const options: any = {
            service: this.serviceName,
            passing: true
        };

        const watch = this.consul.watch({
            method: this.consul.health.service,
            options
        });

        watch.on("change", (changes, res) => {
            this.nodes = changes.map(data => data.Service);
            console.log(`Service ${this.serviceName} access points:`, this.nodes);
        });

        watch.on("error", function(err) {
            console.error("error:" + err);
        });

        setTimeout(function() {
            // why?
            watch.end();
        }, 30 * 1000);
    }

    public async get(resourcePath: string, configuration?: AxiosRequestConfig): Promise<any> {

        const uri = path.join(this.protocol, this.basePath, resourcePath);

        return await Axios
          .get(uri, configuration);
    }

    public async post(resourcePath: string, data?: any, configuration?: AxiosRequestConfig): Promise<any> {
        const uri = path.join(this.protocol, this.basePath, resourcePath);

        return await Axios
          .post(uri, data, configuration);
    }

    public async put(resourcePath: string, data?: any, configuration?: AxiosRequestConfig): Promise<any> {
        const uri = path.join(this.protocol, this.basePath, resourcePath);

        return await Axios
          .put(uri, data, configuration);
    }

    public async delete(resourcePath: string, configuration?: AxiosRequestConfig): Promise<any> {
        const uri = path.join(this.protocol, this.basePath, resourcePath);

        return await Axios
          .delete(uri, configuration);
    }
}
