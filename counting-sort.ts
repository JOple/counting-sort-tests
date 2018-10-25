
/**
 * Sequential counting sort
 * @param array input array
 * @param ascending if the result is ascending or not
 */
export function sort(array: number[], ascending = true): number[] {
    let counts: number[] = []
    for (let num of array)
        counts[num] = counts[num] ? counts[num] + 1 : 1

    let output: number[] = []
    if (ascending) {
        let len = counts.length
        for (let num = 0; num < len; num++) {
            let count = counts[num]
            if (count) {
                for (let i = 0; i < count; i++)
                    output.push(num)
            }
        }
    } else {
        let len = counts.length
        for (let num = 0; num < len; num++) {
            let count = counts[num]
            if (count) {
                for (let i = 0; i < count; i++)
                    output.unshift(num)
            }
        }
    }

    return output
}

/**
 * Counts the numbers in a section of an array
 * @param array the input array
 * @param start the beginning index where to start the counting
 * @param end the end index where to start the counting
 */
async function count(array: number[], start: number, end: number): Promise<number[]> {
    return new Promise<number[]>(resolve => {
        let counts: number[] = []
        for (let num = start; num < end; num++)
            counts[num] = counts[num] ? counts[num] + 1 : 1
        resolve(counts)
    })
}

/**
 * Parallel counting sort
 * @param array input array
 * @param threads number of threads running the sort
 * @param ascending if the result is ascending or not
 */
export async function sortParallel(array: number[], threads = 4, ascending = true): Promise<number[]> {
    return new Promise<number[]>(resolve => {
        if (threads <= 1) {
            resolve(sort(array, ascending))
            return
        }

        let size = Math.ceil(array.length / threads)

        let allCounts: number[][] = []
        for (let i = 0; i < threads; i++) {
            let start = i * size
            let end = start + size - 1
            if (end > array.length) end = array.length - 1
            count(array, start, end).then(counts => {
                allCounts.push(counts)
                if (allCounts.length == threads) {

                    // Combining counts
                    let clen = allCounts.length
                    let counts = allCounts[0]
                    for (let i = 1; i < clen; i++) {
                        let pcounts = allCounts[i]
                        let maxLen = Math.max(counts.length, pcounts.length)
                        for (let num = 0; num < maxLen; num++) {
                            let a = counts[i] || 0
                            let b = pcounts[i] || 0
                            counts[i] = a + b
                        }
                    }

                    // Building output
                    let output: number[] = []
                    if (ascending) {
                        let len = counts.length
                        for (let num = 0; num < len; num++) {
                            let count = counts[num]
                            if (count) {
                                for (let i = 0; i < count; i++)
                                    output.push(num)
                            }
                        }
                    } else {
                        let len = counts.length
                        for (let num = 0; num < len; num++) {
                            let count = counts[num]
                            if (count) {
                                for (let i = 0; i < count; i++)
                                    output.unshift(num)
                            }
                        }
                    }
                    resolve(output)
                }
            })
        }
    })
}

export async function sortParallel2(array: number[], ascending = true) {
    return new Promise<number[]>(resolve => {

        let size = Math.ceil(array.length / 2)

        let allCounts: number[][] = []
        for (let i = 0; i < 2; i++) {
            let start = i * size
            let end = start + size - 1
            if (end > array.length) end = array.length - 1
            count(array, start, end).then(counts => {
                allCounts.push(counts)
                if (allCounts.length == 2) {

                    // Combining counts
                    let clen = allCounts.length
                    let counts = allCounts[0]
                    for (let i = 1; i < clen; i++) {
                        let pcounts = allCounts[i]
                        let maxLen = Math.max(counts.length, pcounts.length)
                        for (let num = 0; num < maxLen; num++) {
                            let a = counts[i] || 0
                            let b = pcounts[i] || 0
                            counts[i] = a + b
                        }
                    }

                    // Building output
                    let output: number[] = []
                    if (ascending) {
                        let len = counts.length
                        for (let num = 0; num < len; num++) {
                            let count = counts[num]
                            if (count) {
                                for (let i = 0; i < count; i++)
                                    output.push(num)
                            }
                        }
                    } else {
                        let len = counts.length
                        for (let num = 0; num < len; num++) {
                            let count = counts[num]
                            if (count) {
                                for (let i = 0; i < count; i++)
                                    output.unshift(num)
                            }
                        }
                    }
                    resolve(output)
                }
            })
        }
    })
}