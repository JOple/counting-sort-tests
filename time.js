"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
class Timer {
    start() {
        this._time = perf_hooks_1.performance.now();
    }
    elapsed() {
        return perf_hooks_1.performance.now() - this._time;
    }
}
exports.Timer = Timer;
