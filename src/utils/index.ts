export function insertStr(str: string, index: number, insertString: string) {
  return str.substring(0, index) + insertString + str.substring(index);
}

export function isRealPhoneNumber(numberVal?: string) {
  const targetNumber = numberVal?.split('-')[1];
  return targetNumber && isNumber(Number(targetNumber));
}

export function isNumber(number: any) {
  return typeof number === 'number' && !Number.isNaN(number) && !!number;
}
