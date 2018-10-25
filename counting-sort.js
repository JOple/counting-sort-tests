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
/**
 * Sequential counting sort
 * @param array input array
 * @param ascending if the result is ascending or not
 */
function sort(array, ascending = true) {
    let counts = [];
    for (let num of array)
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    let output = [];
    if (ascending) {
        let len = counts.length;
        for (let num = 0; num < len; num++) {
            let count = counts[num];
            if (count) {
                for (let i = 0; i < count; i++)
                    output.push(num);
            }
        }
    }
    else {
        let len = counts.length;
        for (let num = 0; num < len; num++) {
            let count = counts[num];
            if (count) {
                for (let i = 0; i < count; i++)
                    output.unshift(num);
            }
        }
    }
    return output;
}
exports.sort = sort;
/**
 * Counts the numbers in a section of an array
 * @param array the input array
 * @param start the beginning index where to start the counting
 * @param end the end index where to start the counting
 */
function count(array, start, end) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            let counts = [];
            for (let num = start; num < end; num++)
                counts[num] = counts[num] ? counts[num] + 1 : 1;
            resolve(counts);
        });
    });
}
/**
 * Parallel counting sort
 * @param array input array
 * @param threads number of threads running the sort
 * @param ascending if the result is ascending or not
 */
function sortParallel(array, threads = 4, ascending = true) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            if (threads <= 1) {
                resolve(sort(array, ascending));
                return;
            }
            let size = Math.ceil(array.length / threads);
            let allCounts = [];
            for (let i = 0; i < threads; i++) {
                let start = i * size;
                let end = start + size - 1;
                if (end > array.length)
                    end = array.length - 1;
                count(array, start, end).then(counts => {
                    allCounts.push(counts);
                    if (allCounts.length == threads) {
                        // Combining counts
                        let clen = allCounts.length;
                        let counts = allCounts[0];
                        for (let i = 1; i < clen; i++) {
                            let pcounts = allCounts[i];
                            let maxLen = Math.max(counts.length, pcounts.length);
                            for (let num = 0; num < maxLen; num++) {
                                let a = counts[i] || 0;
                                let b = pcounts[i] || 0;
                                counts[i] = a + b;
                            }
                        }
                        // Building output
                        let output = [];
                        if (ascending) {
                            let len = counts.length;
                            for (let num = 0; num < len; num++) {
                                let count = counts[num];
                                if (count) {
                                    for (let i = 0; i < count; i++)
                                        output.push(num);
                                }
                            }
                        }
                        else {
                            let len = counts.length;
                            for (let num = 0; num < len; num++) {
                                let count = counts[num];
                                if (count) {
                                    for (let i = 0; i < count; i++)
                                        output.unshift(num);
                                }
                            }
                        }
                        resolve(output);
                    }
                });
            }
        });
    });
}
exports.sortParallel = sortParallel;
function sortParallel2(array, ascending = true) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            let size = Math.ceil(array.length / 2);
            let allCounts = [];
            for (let i = 0; i < 2; i++) {
                let start = i * size;
                let end = start + size - 1;
                if (end > array.length)
                    end = array.length - 1;
                count(array, start, end).then(counts => {
                    allCounts.push(counts);
                    if (allCounts.length == 2) {
                        // Combining counts
                        let clen = allCounts.length;
                        let counts = allCounts[0];
                        for (let i = 1; i < clen; i++) {
                            let pcounts = allCounts[i];
                            let maxLen = Math.max(counts.length, pcounts.length);
                            for (let num = 0; num < maxLen; num++) {
                                let a = counts[i] || 0;
                                let b = pcounts[i] || 0;
                                counts[i] = a + b;
                            }
                        }
                        // Building output
                        let output = [];
                        if (ascending) {
                            let len = counts.length;
                            for (let num = 0; num < len; num++) {
                                let count = counts[num];
                                if (count) {
                                    for (let i = 0; i < count; i++)
                                        output.push(num);
                                }
                            }
                        }
                        else {
                            let len = counts.length;
                            for (let num = 0; num < len; num++) {
                                let count = counts[num];
                                if (count) {
                                    for (let i = 0; i < count; i++)
                                        output.unshift(num);
                                }
                            }
                        }
                        resolve(output);
                    }
                });
            }
        });
    });
}
exports.sortParallel2 = sortParallel2;
