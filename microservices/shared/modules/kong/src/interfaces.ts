import { AxiosRequestConfig } from 'axios';

export interface KongTarget {
    id?: string;
    upstream: string;
    target: string;
    weight?: number;
}

export interface KongClientOptions {
    host: string;
    port?: number;
    secure?: boolean;
    maxRetry?: number;
    retryInterval?: number;
}

export interface KongModuleConfiguration {
    kong: KongClientOptions;
    service?: KongTarget;
}

export interface IRemoteRepository<T> {
    setConfiguration(defaultConfiguration: AxiosRequestConfig): void;

    list(configuration?: AxiosRequestConfig): Promise<T[]>;

    search(data?: any, configuration?: AxiosRequestConfig): Promise<T | null>;

    create(data?: any, configuration?: AxiosRequestConfig): Promise<T>;

    update(data?: any, configuration?: AxiosRequestConfig): Promise<T>;

    remove(configuration?: AxiosRequestConfig): Promise<void>;

    raw(extra: AxiosRequestConfig): Promise<any>;
}
