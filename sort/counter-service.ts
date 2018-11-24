import * as http from "http"
import * as zlib from "zlib"

function count(array: number[]) {
    let counts: number[] = []
    for (let num of array)
        counts[num] = counts[num] ? counts[num] + 1 : 1
    return counts
}

export function counterHttpZipServer() {
    return http.createServer((req, res) => {
        let chunks = [];
        req.on('data', (chunk) => {
            chunks.push(chunk)
        }).on('end', () => {
            zlib.inflate(Buffer.concat(chunks), (err, inflated) => {
                let json = JSON.parse(inflated.toString())
                let binary = new Buffer(JSON.stringify(count(json)))
                zlib.deflate(binary, (err, deflated) => {
                    res.statusCode = 200
                    res.write(deflated)
                    res.end()
                });
            })
        });
    })
}