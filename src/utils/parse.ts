import type { Formula, ParsedFormula } from '../calculator/state/state.ts';

import { isOperatorInFormula } from './confirm.ts';

export const parseNumber = (value: string) => {
	return Number.isInteger(value) ? parseInt(value, 10) : parseFloat(value);
};

export const parseFormula = (formula: Formula): ParsedFormula =>
	formula.map((item) => (isOperatorInFormula(item) ? item : parseNumber(item)));

export const getDecimalLength = (value: number) => {
	const parts = value.toString().split('.');
	return !parts[1] ? 0 : parts[1].length;
};
