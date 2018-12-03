import { latencyClient } from "../utils/latency";

latencyClient({
    host: '137.117.58.103',
    port: '9001',
    path: '/',
    method: 'POST'
}).then(console.log)