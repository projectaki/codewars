export class G964 {
  public static revrot(str, sz) {
    return sz <= 0 || !str || sz > str.length
      ? ''
      : getChunks(str, sz).reduce((acc, curr) => (isChunkValid(curr) ? (acc += reverseChunk(curr)) : (acc += rotateChunk(curr))), '');
  }
}

export const getChunks = (str: string, sz: number): string[] =>
  str.split('').reduce((acc, _curr, idx) => (idx % sz === sz - 1 ? [...acc, str.slice(idx - (sz - 1), idx + 1)] : acc), []);
export const isChunkValid = (chunk: string) =>
  chunk
    .split('')
    .map(x => +x)
    .reduce((acc, curr) => acc + curr * curr) %
    2 ===
  0;
export const reverseChunk = (chunk: string) => chunk.split('').reverse().join('');
export const rotateChunk = ([first, ...rest]: string): string => [...rest, first].join('');
