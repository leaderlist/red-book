export function insertStr(str: string, index: number, insertString: string) {
  return str.substring(0, index) + insertString + str.substring(index);
}

export function isRealPhoneNumber(numberVal?: string) {
  return numberVal && isNumber(Number(numberVal));
}

export function isNumber(number: any) {
  return typeof number === 'number' && !Number.isNaN(number) && !!number;
}
