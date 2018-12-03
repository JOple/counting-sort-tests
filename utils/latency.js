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
const metrics_1 = require("./metrics");
function latencyServer() {
    return http.createServer((req, res) => {
        req.on('end', () => {
            res.statusCode = 200;
            res.end();
        });
    });
}
exports.latencyServer = latencyServer;
function latencyClient(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield metrics_1.executionTime(() => new Promise(resolve => {
            http.request(opts, resolve);
        }));
    });
}
exports.latencyClient = latencyClient;
