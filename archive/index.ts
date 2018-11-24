import { descending } from "../utils/array-maker";
import { sort, sortParallel, countHttp } from "../counting-sort";
import { executionTime } from "../utils/metrics";

import * as http from "http"
import * as zlib from "zlib"

export async function countHttpZip(array: number[], start: number, end: number) {
    return new Promise<number[]>((resolve, reject) => {
        let subarray = array.filter((v, i) => i >= start && i < end)
        zlib.deflate(JSON.stringify(subarray), (err, deflated) => {
            let opts = {
                host: 'localhost',
                port: '4000',
                path: '/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-binary',
                    'Content-Length': Buffer.byteLength(deflated)
                }
            }
            let s = http.request(opts, res => {
                res.setEncoding("binary")
                let chunks = [];
                res.on('data', (chunk) => {
                    chunks.push(new Buffer(chunk, "binary"));
                }).on('end', () => {
                    let binary = Buffer.concat(chunks)
                    zlib.inflate(binary, (err, inflated) => {
                        resolve(JSON.parse(inflated.toString("utf-8")))
                    })
                })
            })
            s.write(deflated)
            s.end()
        })
    })
}

/**
 * Run sorting algorithms separately
 * Running them simultaneously will cause algorithms near the last receive less resources
 */
// async function main() {


//     let record = {}

//     for (let n = 1000; n < 100000000; n *= 10) {

//         let array = descending(n)

//         let elapsedHttp = await executionTime(() => sortParallel(array, 3, true, countHttp))
//         console.log("http    ", elapsedHttp)

//         let elapsedSeq = await executionTime(() => sort(array))
//         console.log("seq     ", elapsedSeq)

//         let elapsedVanilla = await executionTime(() => array.sort((a, b) => a - b))
//         console.log("vanilla ", elapsedVanilla)

//         let elapsedParallel = await executionTime(() => sortParallel(array, 2))
//         console.log("parallel", elapsedParallel)

//         record["" + n] = {
//             http: elapsedHttp,
//             seq: elapsedSeq,
//             vanilla: elapsedVanilla,
//             parallel: elapsedParallel
//         }
//     }

//     return record
// }

// async function findBestThreadsForSortHttp() {
//     let array = descending(100000)

//     let record = {}

//     for (let n = 2; n < 20; n += 1) {
//         let elapsed = await executionTime(() => sortParallel(array, n, true, countHttpZip))
//         record[n + ""] = elapsed
//     }

//     console.log(record)
// }

// // main().then(r => console.log(JSON.stringify(r, null, 4))).catch(e => { throw e })
// findBestThreadsForSortHttp().then(r => console.log(JSON.stringify(r, null, 4))).catch(e => { throw e })

