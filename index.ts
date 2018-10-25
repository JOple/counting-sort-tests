import { random, descending, ascending } from "./array-maker";
import { sort, sortParallel, sortParallel2 } from "./counting-sort";
import { Timer } from "./time";

/**
 * Run sorting algorithms separately
 * Running them simultaneously will cause algorithms near the last receive less resources
 */
async function main() {

    let record = {}

    for (let n = 1000; n < 100000000; n *= 10) {

        let array = ascending(n)

        let t1 = new Timer()
        t1.start()
        let out1 = sort(array)
        let elapsed1 = t1.elapsed()
        console.log("1", elapsed1)

        let t2 = new Timer()
        t2.start()
        let out2 = array.sort((a, b) => a - b)
        let elapsed2 = t2.elapsed()
        console.log("2", elapsed2)

        let t4 = new Timer()
        t4.start()
        let out4 = await sortParallel2(array)
        let elapsed4 = t4.elapsed()
        console.log("4", elapsed4)

        let t3 = new Timer()
        t3.start()
        let out3 = await sortParallel(array, 2)
        let elapsed3 = t3.elapsed()
        console.log("3", elapsed3)

        let t5 = new Timer()
        t5.start()
        let out5 = await sortParallel2(array)
        let elapsed5 = t5.elapsed()
        console.log("5", elapsed5)

        record["" + n] = {
            elapsed1: elapsed1,
            elapsed2: elapsed2,
            elapsed3: elapsed3,
            elapsed4: elapsed4,
            elapsed5: elapsed5
        }
    }

    return record
}

async function main2() {

    let records = {}

    let array = random(100000)
    for (let numThreads = 1; numThreads < 15; numThreads++) {
        let t = new Timer()
        t.start()
        let out = await sortParallel(array, numThreads)
        let elapsed = t.elapsed()
        console.log(elapsed)
        records["" + numThreads] = elapsed
    }

    return records
}

main().then(r => console.log(JSON.stringify(r, null, 4))).catch(e => { throw e })

