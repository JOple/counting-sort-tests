"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const zlib = require("zlib");
function count(array) {
    let counts = [];
    for (let num of array)
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    return counts;
}
function counterHttpZipServer() {
    return http.createServer((req, res) => {
        let chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk);
        }).on('end', () => {
            zlib.inflate(Buffer.concat(chunks), (err, inflated) => {
                let json = JSON.parse(inflated.toString());
                let binary = new Buffer(JSON.stringify(count(json)));
                zlib.deflate(binary, (err, deflated) => {
                    res.statusCode = 200;
                    res.write(deflated);
                    res.end();
                });
            });
        });
    });
}
exports.counterHttpZipServer = counterHttpZipServer;
