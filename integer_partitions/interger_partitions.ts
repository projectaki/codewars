// TODO: FINISH OPTIMIZATION
export class G964 {
  public static part = n => {
    const memo = {};
    const res = rec(n, memo);
    const products = res.map(sub => {
      return sub.reduce((a, b) => a * b, 1);
    });
    const set = new Set(products);
    const sorted = Array.from(set).sort((a: number, b: number) => a - b);
    const range = +sorted[sorted.length - 1] - +sorted[0];
    const sum = sorted.reduce((a, b) => +a + +b, 0);
    const avg = +(+sum / +sorted.length);
    const median =
      sorted.length % 2 === 0
        ? +(+sorted[Math.floor(sorted.length / 2)] + +sorted[Math.floor(sorted.length / 2) - 1]) / 2
        : +sorted[Math.floor(sorted.length / 2)];
    const dAvg = (Math.round(avg * 100) / 100).toFixed(2);
    const dMedian = (Math.round(median * 100) / 100).toFixed(2);

    const resultString = `Range: ${range} Average: ${dAvg} Median: ${dMedian}`;

    return resultString;
  };
}

export const rec = (remainder: number, memo: any) => {
  if (remainder === 0) {
    return [[]];
  }
  if (memo[remainder]) return memo[remainder];
  const arr = [];
  for (let i = remainder; i > 0; i--) {
    const res = rec(remainder - i, memo);
    memo[remainder - i] = res;

    res.forEach(x => {
      const n = [...x, i];
      arr.push(n);
    });
  }

  return arr;
};
