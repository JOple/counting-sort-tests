"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("../sort/test");
const array_maker_1 = require("../utils/array-maker");
const sort_1 = require("../sort/sort");
const counter_1 = require("../sort/counter");
let arrays = {
    // "1000": descending(1000),
    // "10000": descending(10000),
    // "100000": descending(100000),
    "many": array_maker_1.descending(10000000),
};
let sorters = {
    // "httpZip": sortBuilder(3, true, countHttpZipClient({
    //     host: 'localhost',
    //     port: '4000',
    //     path: '/',
    //     method: 'POST'
    // })),
    "hybrid": sort_1.sortBuilder(3, true, counter_1.countHybrid({
        // host: '104.211.20.189',
        host: 'localhost',
        port: '9000',
        path: '/',
        method: 'POST'
    })),
    "vanilla": array => array.sort((a, b) => a - b),
};
test_1.testSpeedPerSorterPerArray(sorters, arrays)
    .then(r => console.log(JSON.stringify(r, null, 4)))
    .catch(console.error);
// testSpeedPerThreads(countHttpZipClient({
//     host: '104.211.20.189',
//     port: '9000',
//     path: '/',
//     method: 'POST'
// }), descending(10000000), ascending(3))
//     .then(r => console.log(JSON.stringify(r, null, 4)))
//     .catch(console.error)
