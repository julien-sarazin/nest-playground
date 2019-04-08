import { KongClientOptions, KongTarget } from '../interfaces';
import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Kong {
    private options: KongClientOptions;
    private baseUrl: string;

    private axios: AxiosInstance;

    constructor(options: KongClientOptions) {
        this.options = options;

        const protocol = options.secure ? 'https' : 'http';
        const port = (options.port && options.port !== 80 && options.port !== 443)
            ? `:${options.port}` : '';

        this.baseUrl = `${protocol}://${options.host}${port}`;
        this.axios = Axios.create({ baseURL: this.baseUrl});
    }

    public async register(target: KongTarget): Promise<KongTarget> {
        if (target.id) {
            throw new KongConflictError('Target Already registered');
        }
        const path = `/upstreams/${target.upstream}/targets`;

        return this.axios
            .post(path, target)
            .then(response => Object.assign(response.data, target));
    }

    public async unregister(target: KongTarget): Promise<any> {
        if (!target.id) {
            throw new InvalidTargetError('Missing target identifier');
        }

        return this.axios
            .delete(`/upstreams/${target.upstream}/targets/${target.id}`)
            .then(_ => true);
    }

    public async request(configuration: AxiosRequestConfig): Promise<any> {
        return this.axios
            .request(configuration);
    }
}

export class KongConflictError extends Error {
}

export class InvalidTargetError extends Error {
}
