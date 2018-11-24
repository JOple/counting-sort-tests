import { performance } from "perf_hooks"

export async function executionTime(callback: () => any) {
    var startTime = performance.now()
    await callback()
    return performance.now() - startTime;
}