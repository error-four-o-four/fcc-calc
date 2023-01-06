import { OPERATIONS, ACTIONS } from '../context/stateData.js';

export function isNumber(value) {
  return !Number.isNaN(parseFloat(value));
}

export function isOperation(value) {
  return Object.values(OPERATIONS).includes(value);
}

export function isAction(value) {
  return Object.values(ACTIONS).includes(value);
}

export function parse(string) {
  return Number.isInteger(string) ? parseInt(string, 10) : parseFloat(string);
}

export function decimalLength(number) {
  const pieces = number.toString().split('.');
  if (!pieces[1]) return 0;
  return pieces[1].length;
}
