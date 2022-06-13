export function findEvenIndex(arr: number[]): number {
  const maxSum = arr.reduce((acc, curr) => {
    return (acc += curr);
  }, 0);

  const rec = (arr: number[], idx: number, left: number, right: number): number => {
    if (left === right) return idx;
    if (idx > arr.length - 2) return -1;

    const currVal = arr[idx];
    const nextVal = arr[idx + 1];

    return rec(arr, idx + 1, left + currVal, right - nextVal);
  };

  return rec(arr, 0, 0, maxSum - arr[0]);
}
