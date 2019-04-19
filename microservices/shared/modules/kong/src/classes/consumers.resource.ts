import { Kong } from './KongClient';

export interface KongConsumer {
    username: string;
    custom_id: string;
}

export interface KongConsumerApiKey {
    consumer: KongConsumer;
    key: string;
}

export class KongConsumersResource {

    constructor(private readonly kongClient: Kong) {

    }

    async create(username: string, custom_id: string, tags: string[] = []): Promise<KongConsumer> {
        return await this.kongClient
            .request({
                url: '/consumers',
                method: 'POST',
                data: {
                    username,
                    custom_id,
                    tags,
                },
            });
    }

    async retrieve(username: string): Promise<KongConsumer> {
        return await this.kongClient
            .request({
                url: `/consumers/${username}`,
                method: 'GET',
            });
    }

    async list(): Promise<KongConsumer[]> {
        return await this.kongClient
            .request({
                url: `/consumers`,
                method: 'GET',
            });
    }

    async update(identifier: string, custom_id: string): Promise<KongConsumer> {
        return await this.kongClient
            .request({
                url: `/consumers/${identifier}`,
                method: 'PUT',
                data: { custom_id },
            });
    }

    async remove(identifier: string): Promise<KongConsumer> {
        return await this.kongClient
            .request({
                url: `/consumers/${identifier}`,
                method: 'DELETE',
            });
    }

    async generateApiKey(consumer: KongConsumer): Promise<KongConsumerApiKey> {
        console.log('> consumer:', consumer);

        return await this.kongClient
            .request({
                url: `/consumers/${consumer.username}/key-auth`,
                method: 'POST',
            });
    }
}
