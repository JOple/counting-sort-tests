export interface Sorter<T> {
    (array: T[]): T[] | PromiseLike<T[]>
}
export interface NumberSorter extends Sorter<number> { }
export interface NumberCounter {
    (array: number[], start: number, end: number): number[] | PromiseLike<number[]>
}
