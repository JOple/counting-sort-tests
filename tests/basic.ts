import { counterHttpZipServer } from "../sort/counter-service";
import { NumberArrays, NumberSorters, testSpeedPerThreads, testSpeedPerSorterPerArray } from "../sort/test";
import { descending, ascending } from "../utils/array-maker";
import { sortBuilder } from "../sort/sort";
import { countSequentially, countParallel, countHttpZipClient, countHybrid } from "../sort/counter";

counterHttpZipServer().listen(4000)

let arrays: NumberArrays = {
    "1000": descending(1000),
    "10000": descending(10000),
    "100000": descending(100000),
}
let sorters: NumberSorters = {
    "httpZip": sortBuilder(3, true, countHttpZipClient({
        host: 'localhost',
        port: '4000',
        path: '/',
        method: 'POST'
    })),
    "hybrid": sortBuilder(3, true, countHybrid({
        host: 'localhost',
        port: '4000',
        path: '/',
        method: 'POST'
    })),
    "vanilla": array => array.sort((a, b) => a - b),
    "sequential": sortBuilder(1, true, countSequentially),
    "parallel": sortBuilder(2, true, countParallel)
}

testSpeedPerSorterPerArray(sorters, arrays)
    .then(r => console.log(JSON.stringify(r, null, 4)))
    .catch(console.error)
// testSpeedPerThreads(countHybrid({
//     host: 'localhost',
//     port: '4000',
//     path: '/',
//     method: 'POST'
// }), descending(100000), ascending(20))
//     .then(r => console.log(JSON.stringify(r, null, 4)))
//     .catch(console.error)