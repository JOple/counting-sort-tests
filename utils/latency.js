"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const perf_hooks_1 = require("perf_hooks");
function latencyServer() {
    return http.createServer((req, res) => {
        req.on('data', () => { });
        req.on('end', () => {
            res.statusCode = 200;
            res.write("");
            res.end();
        });
    });
}
exports.latencyServer = latencyServer;
function latencyClient(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        var startTime = perf_hooks_1.performance.now();
        yield new Promise(resolve => {
            var req = http.request(opts, res => {
                res.on('data', () => { });
                res.on('end', () => resolve());
            });
            req.write("");
            req.end();
        });
        return perf_hooks_1.performance.now() - startTime;
    });
}
exports.latencyClient = latencyClient;
