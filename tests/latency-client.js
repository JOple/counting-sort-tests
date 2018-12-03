"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const latency_1 = require("../utils/latency");
latency_1.latencyClient({
    host: 'localhost',
    port: '9001',
    path: '/',
    method: 'POST'
}).then(console.log);
