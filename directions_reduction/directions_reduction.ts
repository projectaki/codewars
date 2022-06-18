export function dirReduc(arr: string[]): string[] {
  const rec = (partial: string[]): string[] => {
    if (partial.length === 1) return partial;

    const [first, ...rest] = partial;

    const [resFirst, ...resRest] = rec(rest);
    if (!resFirst || (resRest.length === 1 && !resRest[0])) return [first];

    if (isRedundant()(first, resFirst)) {
      return resRest;
    } else {
      return [first, resFirst, ...resRest];
    }
  };
  const result = rec(arr);
  return result;
}

export function isRedundant() {
  const dict = new Map<string, string>();
  dict.set('EAST', 'WEST');
  dict.set('WEST', 'EAST');
  dict.set('NORTH', 'SOUTH');
  dict.set('SOUTH', 'NORTH');

  const func = (direc1: string, direc2: string) => dict.get(direc1) === direc2;

  return func;
}
