"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const zlib = require("zlib");
/* ********************************
 * NumberCounter
 * ********************************/
exports.countSequentially = (array, start, end) => {
    let counts = [];
    for (let i = start; i < end; i++) {
        let num = array[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return Promise.resolve(counts);
};
exports.countParallel = (array, start, end) => {
    return new Promise(resolve => resolve(exports.countSequentially(array, start, end)));
};
/* ********************************
 * NumberCounter Builders
 * ********************************/
function countHttpZipClient(opts) {
    return (array, start, end) => {
        return new Promise(resolve => {
            let subarray = array.filter((v, i) => i >= start && i < end);
            zlib.deflate(JSON.stringify(subarray), (err, deflated) => {
                opts.headers = opts.headers || {};
                opts.headers["Content-Length"] = Buffer.byteLength(deflated);
                let s = http.request(opts, res => {
                    res.setEncoding("binary");
                    let chunks = [];
                    res.on('data', (chunk) => {
                        chunks.push(new Buffer(chunk, "binary"));
                    }).on('end', () => {
                        let binary = Buffer.concat(chunks);
                        zlib.inflate(binary, (err, inflated) => {
                            resolve(JSON.parse(inflated.toString("utf-8")));
                        });
                    });
                });
                s.write(deflated);
                s.end();
            });
        });
    };
}
exports.countHttpZipClient = countHttpZipClient;
function countHybrid(opts) {
    let httpCounter = countHttpZipClient(opts);
    let parallelCounter = exports.countParallel;
    return (array, start, end) => {
        if (start == 0)
            return parallelCounter(array, start, end);
        else
            return httpCounter(array, start, end);
    };
}
exports.countHybrid = countHybrid;
