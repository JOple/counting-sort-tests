import * as http from "http"
import { executionTime } from "./metrics";

export function latencyServer() {
    return http.createServer((req, res) => {
        req.on('end', () => {
            console.log("Request recieved")
            res.statusCode = 200
            res.write("")
            res.end()
        })
    })
}
export async function latencyClient(opts: http.RequestOptions): Promise<number> {
    return executionTime(() => new Promise(resolve => {
        var req = http.request(opts, res => {
            console.log("Response received")
            res.on('end', () => resolve())
        })
        req.write("")
        req.end()
    }))
}