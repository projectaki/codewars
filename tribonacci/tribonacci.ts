export function tribonacci([a, b, c]: [number, number, number], n: number): number[] {
  if (n === 0) return [];

  const memo = new Array(n + 1).fill(-1);
  const result = tribonacciAtNMemo([a, b, c], n, memo);
  memo.shift();
  return memo;
}

export function tribonacciAtNMemo([a, b, c]: [number, number, number], n: number, memo: number[]): number {
  if (memo[n] !== -1) return memo[n];
  if (n === 1) {
    memo[1] = a;
    return a;
  }
  if (n === 2) {
    memo[2] = b;
    memo[1] = a;
    return b;
  }
  if (n === 3) {
    memo[3] = c;
    memo[2] = b;
    memo[1] = a;
    return c;
  }

  const valueAtN =
    tribonacciAtNMemo([a, b, c], n - 1, memo) + tribonacciAtNMemo([a, b, c], n - 2, memo) + tribonacciAtNMemo([a, b, c], n - 3, memo);
  memo[n] = valueAtN;
  return valueAtN;
}
