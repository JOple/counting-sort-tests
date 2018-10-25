import { performance } from "perf_hooks"

export class Timer {

    private _time: number

    public start() {
        this._time = performance.now()
    }

    public elapsed() {
        return performance.now() - this._time
    }
}