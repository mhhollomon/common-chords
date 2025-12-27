import { concat } from 'radashi';

/**
 * Concatenates multiple values into a single string, separated by spaces.
 * @param {any} v1 - The first value to concatenate
 * @param {any} v2 - The second value to concatenate
 * @param {any[]} args - Any additional values to concatenate
 * @returns {string} - The concatenated string
 */
export function cn(v1: any, v2: any, ...args: any[]) : string {
    return concat(v1, v2, ...args).join(" ");
}


export function capitalize(s : string) {
    return s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase();
}

export function rotateArray<T>(arr : T[], k : number) : T[] {
    return arr.slice(k).concat(arr.slice(0, k));
}

export function range(start : number, end : number) {
    end = Math.floor(end);
    start = Math.floor(start);
    return Array.from({length: (end - start)}, (_, k) => k + start)
}

export async function  sleep(ms : number)  { return new Promise(r => setTimeout(r, ms)); }

export function stringHash(s : string) : number {
    let hash = 0;
    if (s.length === 0) return hash;
    for (let i = 0; i < s.length; i++) {
        const chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}