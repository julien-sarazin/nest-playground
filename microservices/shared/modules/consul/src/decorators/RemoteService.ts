export const RemoteService = (name?: string, criteria?: any): PropertyDecorator => {
    return function(target: any, propertyName: string) {
        console.log('> name:', name);
        console.log('> criteria:', criteria);
        console.log('> target:', target);
        console.log('> propertyName:', propertyName);
    };
};
