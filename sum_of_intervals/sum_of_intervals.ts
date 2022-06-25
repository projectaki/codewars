export function sumOfIntervals(intervals: [number, number][]) {
  const root = {
    value: intervals[0],
    left: null,
    right: null,
  };

  const insert = (tn: any, val: [number, number]) => {
    if (!tn) {
      const node = {
        value: val,
        left: null,
        right: null,
      };

      return node;
    }

    const { value } = tn;
    const [x, y] = value;
    const [iX, iY] = val;

    if (iX < x) {
      tn.left = insert(tn.left, val);
    } else {
      tn.right = insert(tn.right, val);
    }

    return tn;
  };

  intervals.slice(1).forEach(x => insert(root, x));

  let highest = Number.MIN_SAFE_INTEGER;
  let sum = 0;
  const sumit = (x: any) => {
    if (!x) return;
    sumit(x.left);
    if (highest <= x.value[1]) {
      const lowerBound = Math.max(highest, x.value[0]);
      sum += x.value[1] - lowerBound;
      highest = x.value[1];
    }
    sumit(x.right);
  };
  sumit(root);
  return sum;
}
