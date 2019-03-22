"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteService = (name, criteria) => {
    return function (target, propertyName) {
        console.log('> name:', name);
        console.log('> criteria:', criteria);
        console.log('> target:', target);
        console.log('> propertyName:', propertyName);
    };
};
