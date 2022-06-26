export function parseMolecule(formula) {
  const { push, pop, peek, size, print, getDictionary } = stack();

  const tokens = splitToTokens(formula);

  for (let i = tokens.length - 1; i >= 0; i--) {
    const currentToken = tokens[i];
    if (typeof currentToken === 'string' && isOpening(currentToken)) {
      const subArr = [];
      while (!isClosing(peek())) {
        const val = pop();
        subArr.push(val);
      }
      const val = pop();
      if (size() > 0 && !isNaN(peek())) {
        const multiplier = pop();
        const newRes = subArr.map(x => {
          x.number *= multiplier;
          return x;
        });
        for (let i = newRes.length - 1; i >= 0; i--) {
          push(newRes[i]);
        }
      } else {
        for (let i = subArr.length - 1; i >= 0; i--) {
          push(subArr[i]);
        }
      }
    } else push(currentToken);
  }

  return getDictionary();
}

export const stack = () => {
  const container = [];

  const push = (val: any) => container.push(val);
  const pop = () => container.pop();
  const peek = () => container[container.length - 1];
  const size = () => container.length;
  const print = () => console.log(container);
  const getDictionary = () => {
    return container.reduce((acc, curr) => {
      const currValue = acc[curr.element] || 0;
      acc[curr.element] = currValue + curr.number;
      return acc;
    }, {});
  };

  return {
    push,
    pop,
    peek,
    size,
    print,
    getDictionary,
  };
};

export const splitToTokens = (formula: string): ({ element: string; number: string } | string)[] => {
  let lastIndex = 0;
  const tokens = formula.split('');
  const newTokens = [];

  tokens.forEach((c, idx) => {
    if (isOpening(c) || isClosing(c)) {
      const toPush = formula.slice(lastIndex, idx);
      if (toPush) newTokens.push(toPush);
      newTokens.push(c);
      lastIndex = idx + 1;
    }
    if (idx === tokens.length - 1) newTokens.push(formula.slice(lastIndex));
  });

  const res = newTokens.reduce((acc, curr) => {
    if (curr.length > 1 || isLetter(curr)) {
      acc.push(...splitFormulaToDict(curr));
    } else acc.push(curr);
    return acc;
  }, []);
  return res;
};

export const splitFormulaToDict = (formula: string) => {
  let lastIndex = 0;
  const tokens = formula.split('');
  const newTokens = [];

  tokens.forEach((c, idx) => {
    if (idx !== 0 && isCapital(c) && isNaN(+c)) {
      newTokens.push(formula.slice(lastIndex, idx));
      lastIndex = idx;
    }
    if (idx === formula.length - 1) newTokens.push(formula.slice(lastIndex));
  });
  if (!isNaN(+newTokens[0])) {
    const dict = newTokens.slice(1).map(e => {
      let numIdx = -1;
      const subTokens = e.split('');
      subTokens.forEach((t, idx) => {
        if (!isNaN(+t) && numIdx === -1) numIdx = idx;
      });
      if (numIdx !== -1) {
        return {
          element: e.slice(0, numIdx),
          number: +e.slice(numIdx),
        };
      } else {
        return {
          element: e,
          number: 1,
        };
      }
    });

    return [newTokens[0], ...dict];
  }
  const dict = newTokens.map(e => {
    let numIdx = -1;
    const subTokens = e.split('');
    subTokens.forEach((t, idx) => {
      if (!isNaN(+t) && numIdx === -1) numIdx = idx;
    });
    if (numIdx !== -1) {
      return {
        element: e.slice(0, numIdx),
        number: +e.slice(numIdx),
      };
    } else {
      return {
        element: e,
        number: 1,
      };
    }
  });

  return dict;
};

// Helpers
export const isCapital = (letter: string) => letter === letter.toUpperCase();
export const isLetter = (letter: string) => letter.toUpperCase() !== letter.toLowerCase();
export const isClosing = (val: string) => val === ')' || val === '}' || val === ']';
export const isOpening = (val: string) => val === '(' || val === '{' || val === '[';
