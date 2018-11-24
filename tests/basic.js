"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const counter_service_1 = require("../sort/counter-service");
const test_1 = require("../sort/test");
const array_maker_1 = require("../utils/array-maker");
const sort_1 = require("../sort/sort");
const counter_1 = require("../sort/counter");
counter_service_1.counterHttpZipServer().listen(4000);
let arrays = {
    "1000": array_maker_1.descending(1000),
    "10000": array_maker_1.descending(10000),
    "100000": array_maker_1.descending(100000),
};
let sorters = {
    "httpZip": sort_1.sortBuilder(3, true, counter_1.countHttpZipClient({
        host: 'localhost',
        port: '4000',
        path: '/',
        method: 'POST'
    })),
    "hybrid": sort_1.sortBuilder(3, true, counter_1.countHybrid({
        host: 'localhost',
        port: '4000',
        path: '/',
        method: 'POST'
    })),
    "vanilla": array => array.sort((a, b) => a - b),
    "sequential": sort_1.sortBuilder(1, true, counter_1.countSequentially),
    "parallel": sort_1.sortBuilder(2, true, counter_1.countParallel)
};
test_1.testSpeedPerSorterPerArray(sorters, arrays)
    .then(r => console.log(JSON.stringify(r, null, 4)))
    .catch(console.error);
// testSpeedPerThreads(countHybrid({
//     host: 'localhost',
//     port: '4000',
//     path: '/',
//     method: 'POST'
// }), descending(100000), ascending(20))
//     .then(r => console.log(JSON.stringify(r, null, 4)))
//     .catch(console.error)
