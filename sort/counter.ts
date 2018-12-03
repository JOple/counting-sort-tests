import * as http from "http"
import * as zlib from "zlib"
import { NumberCounter } from "./model";

/* ********************************
 * NumberCounter
 * ********************************/
export const countSequentially: NumberCounter = (array, start, end) => {
    let counts: number[] = []
    for (let i = start; i < end; i++) {
        let num = array[i]
        counts[num] = counts[num] ? counts[num] + 1 : 1
    }
    return Promise.resolve(counts)
}
export const countParallel: NumberCounter = (array, start, end) => {
    return new Promise<number[]>(resolve => resolve(countSequentially(array, start, end)))
}

/* ********************************
 * NumberCounter Builders
 * ********************************/
export function countHttpZipClient(opts: http.RequestOptions): NumberCounter {
    return (array, start, end) => {
        return new Promise<number[]>(resolve => {
            let subarray = array.filter((v, i) => i >= start && i < end)
            zlib.deflate(JSON.stringify(subarray), (err, deflated) => {
                opts.headers = opts.headers || {}
                opts.headers["Content-Length"] = Buffer.byteLength(deflated)
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
}
export function countHybrid(opts: http.RequestOptions): NumberCounter {
    let httpCounter = countHttpZipClient(opts)
    let parallelCounter = countParallel
    return (array, start, end) => {
        if (start == 0) return parallelCounter(array, start, end)
        else return httpCounter(array, start, end)
    }
}