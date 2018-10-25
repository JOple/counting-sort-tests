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
const array_maker_1 = require("./array-maker");
const counting_sort_1 = require("./counting-sort");
const time_1 = require("./time");
/**
 * Run sorting algorithms separately
 * Running them simultaneously will cause algorithms near the last receive less resources
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let record = {};
        for (let n = 1000; n < 100000000; n *= 10) {
            let array = array_maker_1.ascending(n);
            let t1 = new time_1.Timer();
            t1.start();
            let out1 = counting_sort_1.sort(array);
            let elapsed1 = t1.elapsed();
            console.log("1", elapsed1);
            let t2 = new time_1.Timer();
            t2.start();
            let out2 = array.sort((a, b) => a - b);
            let elapsed2 = t2.elapsed();
            console.log("2", elapsed2);
            let t4 = new time_1.Timer();
            t4.start();
            let out4 = yield counting_sort_1.sortParallel2(array);
            let elapsed4 = t4.elapsed();
            console.log("4", elapsed4);
            let t3 = new time_1.Timer();
            t3.start();
            let out3 = yield counting_sort_1.sortParallel(array, 2);
            let elapsed3 = t3.elapsed();
            console.log("3", elapsed3);
            let t5 = new time_1.Timer();
            t5.start();
            let out5 = yield counting_sort_1.sortParallel2(array);
            let elapsed5 = t5.elapsed();
            console.log("5", elapsed5);
            record["" + n] = {
                elapsed1: elapsed1,
                elapsed2: elapsed2,
                elapsed3: elapsed3,
                elapsed4: elapsed4,
                elapsed5: elapsed5
            };
        }
        return record;
    });
}
function main2() {
    return __awaiter(this, void 0, void 0, function* () {
        let records = {};
        let array = array_maker_1.random(100000);
        for (let numThreads = 1; numThreads < 15; numThreads++) {
            let t = new time_1.Timer();
            t.start();
            let out = yield counting_sort_1.sortParallel(array, numThreads);
            let elapsed = t.elapsed();
            console.log(elapsed);
            records["" + numThreads] = elapsed;
        }
        return records;
    });
}
main().then(r => console.log(JSON.stringify(r, null, 4))).catch(e => { throw e; });
