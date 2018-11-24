"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ascending(n) {
    let array = [];
    for (let i = 0; i < n; i++)
        array.push(i);
    return array;
}
exports.ascending = ascending;
function descending(n) {
    let array = [];
    for (let i = n - 1; i >= 0; i--)
        array.push(i);
    return array;
}
exports.descending = descending;
function random(n) {
    let cache = ascending(n);
    return cache.sort((a, b) => Math.random() - 0.5);
}
exports.random = random;
