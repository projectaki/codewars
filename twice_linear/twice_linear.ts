export function dblLinear(n: number): number {
  const set = new Set<number>();
  bfs(1, n, set);

  return [...set][n];
}

export const bfs = (x: number, n: number, set: Set<number>) => {
  const pq = new MinPQ();
  pq.insert(x);
  while (set.size <= n && !pq.isEmpty()) {
    const next = pq.pop();
    set.add(next);
    const y = genY(next);
    const z = genZ(next);
    pq.insert(y);
    pq.insert(z);
  }
};

export const genY = (x: number) => 2 * x + 1;

export const genZ = (x: number) => 3 * x + 1;

export class MinPQ {
  private _heap: number[];
  private _N: number;

  constructor() {
    this._heap = [];
    this._N = 0;
  }

  isEmpty() {
    return this._N === 0;
  }

  insert(value: number) {
    this._heap[++this._N] = value;
    this._swim(this._N);
  }

  pop(): number {
    if (this._N === 0) {
      console.log('Queue is empty!');
      return -1;
    }
    let max = this._heap[1];
    this._swap(1, this._N--);
    this._sink(1);
    this._heap[this._N + 1] = -1;
    return max;
  }

  peek() {
    return this._heap[1];
  }

  _swim(index: any) {
    while (index > 1 && this._larger(Math.floor(index / 2), index)) {
      this._swap(index, Math.floor(index / 2));
      index = Math.floor(index / 2);
    }
  }

  _sink(index: any) {
    while (2 * index <= this._N) {
      let indexchild = 2 * index;
      if (indexchild < this._N && this._larger(indexchild, indexchild + 1)) indexchild++;
      if (!this._larger(index, indexchild)) break;
      this._swap(index, indexchild);
      index = indexchild;
    }
  }

  _larger(i: any, j: any) {
    return this._heap[i] > this._heap[j];
  }

  _swap(i: any, j: any) {
    const temp = this._heap[i];
    this._heap[i] = this._heap[j];
    this._heap[j] = temp;
  }
}
