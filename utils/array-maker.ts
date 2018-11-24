export interface SimpleArrayBuilder<T> {
    (n: number): T[]
}
export interface NumberArrayBuilder extends SimpleArrayBuilder<number> { }

export function ascending(n: number): number[] {
    let array = []
    for (let i = 0; i < n; i++)
        array.push(i)
    return array;
}
export function descending(n: number): number[] {
    let array = []
    for (let i = n - 1; i >= 0; i--)
        array.push(i)
    return array;
}
export function random(n: number): number[] {
    let cache = ascending(n)
    return cache.sort((a, b) => Math.random() - 0.5)
}