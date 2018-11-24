import { NumberSorter, NumberCounter } from "./model";
import { executionTime } from "../utils/metrics";
import { sortBuilder } from "./sort";

export interface NumberSorters {
    [sorterName: string]: NumberSorter
}
export interface NumberArrays {
    [arrayName: string]: number[]
}

export interface SpeedPerSorter {
    [sorterName: string]: number
}
export interface SpeedPerArray {
    [arrayName: string]: number
}

export interface SpeedPerSorterPerArray {
    [sorterName: string]: SpeedPerArray
}

export interface SpeedPerThread {
    [threadCount: number]: number
}

export async function testSpeed(sorter: NumberSorter, array: number[]) {
    return await executionTime(() => sorter(array))
}
export async function testSpeedPerSorter(sorters: NumberSorters, array: number[]) {
    let speeds: SpeedPerSorter = {}
    for (let name in sorters) {
        let sorter = sorters[name]
        speeds[name] = await testSpeed(sorter, array)
    }
    return speeds
}
export async function testSpeedPerArray(sorter: NumberSorter, arrays: NumberArrays) {
    let speeds: SpeedPerArray = {}
    for (let arrayName in arrays) {
        let array = arrays[arrayName]
        speeds[arrayName] = await testSpeed(sorter, array)
    }
    return speeds
}
export async function testSpeedPerSorterPerArray(sorters: NumberSorters, arrays: NumberArrays) {
    let speeds: SpeedPerSorterPerArray = {}
    for (let sorterName in sorters) {
        let sorter = sorters[sorterName]
        speeds[sorterName] = await testSpeedPerArray(sorter, arrays)
    }
    return speeds
}

export async function testSpeedPerThreads(counter: NumberCounter, array: number[], threadCounts: number[], ascending = true) {
    let speeds: SpeedPerThread = {}
    for (let threadCount of threadCounts) {
        if (threadCount <= 0) continue
        let sorter = sortBuilder(threadCount, ascending, counter)
        speeds[threadCount] = await testSpeed(sorter, array)
    }
    return speeds
}