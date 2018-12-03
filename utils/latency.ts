import * as http from "http"
import { executionTime } from "./metrics";

export function latencyServer() {
    return http.createServer((req, res) => {
        req.on('end', () => {
            res.statusCode = 200
            res.end()
        })
    })
}
export async function latencyClient(opts: http.RequestOptions): Promise<number> {
    return await executionTime(() => new Promise(resolve => {
        http.request(opts, resolve)
    }))
}