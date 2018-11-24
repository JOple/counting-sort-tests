"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../utils/metrics");
const sort_1 = require("./sort");
function testSpeed(sorter, array) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield metrics_1.executionTime(() => sorter(array));
    });
}
exports.testSpeed = testSpeed;
function testSpeedPerSorter(sorters, array) {
    return __awaiter(this, void 0, void 0, function* () {
        let speeds = {};
        for (let name in sorters) {
            let sorter = sorters[name];
            speeds[name] = yield testSpeed(sorter, array);
        }
        return speeds;
    });
}
exports.testSpeedPerSorter = testSpeedPerSorter;
function testSpeedPerArray(sorter, arrays) {
    return __awaiter(this, void 0, void 0, function* () {
        let speeds = {};
        for (let arrayName in arrays) {
            let array = arrays[arrayName];
            speeds[arrayName] = yield testSpeed(sorter, array);
        }
        return speeds;
    });
}
exports.testSpeedPerArray = testSpeedPerArray;
function testSpeedPerSorterPerArray(sorters, arrays) {
    return __awaiter(this, void 0, void 0, function* () {
        let speeds = {};
        for (let sorterName in sorters) {
            let sorter = sorters[sorterName];
            speeds[sorterName] = yield testSpeedPerArray(sorter, arrays);
        }
        return speeds;
    });
}
exports.testSpeedPerSorterPerArray = testSpeedPerSorterPerArray;
function testSpeedPerThreads(counter, array, threadCounts, ascending = true) {
    return __awaiter(this, void 0, void 0, function* () {
        let speeds = {};
        for (let threadCount of threadCounts) {
            if (threadCount <= 0)
                continue;
            let sorter = sort_1.sortBuilder(threadCount, ascending, counter);
            speeds[threadCount] = yield testSpeed(sorter, array);
        }
        return speeds;
    });
}
exports.testSpeedPerThreads = testSpeedPerThreads;
