"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sortBuilder(threads = 4, ascending = true, counter) {
    return array => new Promise(resolve => {
        let len = array.length;
        threads = threads < len ? threads : len;
        let size = Math.ceil(len / threads);
        let allCounts = [];
        for (let i = 0; i < threads; i++) {
            let start = i * size;
            let end = start + size - 1;
            if (end > len)
                end = len - 1;
            Promise.resolve(counter(array, start, end)).then(counts => {
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
                    let update = ascending ? num => output.push(num) : num => output.unshift(num);
                    let len = counts.length;
                    for (let num = 0; num < len; num++) {
                        let count = counts[num];
                        if (count) {
                            for (let i = 0; i < count; i++)
                                update(num);
                        }
                    }
                    resolve(output);
                }
            });
        }
    });
}
exports.sortBuilder = sortBuilder;
