import * as http from "http"
import { performance } from "perf_hooks"

export function latencyServer() {
    return http.createServer((req, res) => {
        req.on('data', () => { })
        req.on('end', () => {
            res.statusCode = 200
            res.write("")
            res.end()
        })
    })
}
export async function latencyClient(opts: http.RequestOptions): Promise<number> {
    var startTime = performance.now()
    await new Promise(resolve => {
        var req = http.request(opts, res => {
            res.on('data', () => { })
            res.on('end', () => resolve())
        })
        req.write("")
        req.end()
    })
    return performance.now() - startTime
}