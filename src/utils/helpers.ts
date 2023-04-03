// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const padLeft = (number: number, length: number, character: string = '0'): string => {
  let result = String(number);
  for (let i = result.length; i < length; ++i) {
    result = character + result;
  }

  return result;
};
