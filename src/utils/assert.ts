import { type Permutations } from './types.ts';

import {
	OPERATORS,
	type Operators,
	type FormulaOperators,
} from '../calculator/config.ts';

export const isTypeOfNumber = (value: unknown) =>
	typeof value === 'number' &&
	!Number.isNaN(value) &&
	Math.abs(value) !== Infinity;

export const isValidNumber = (value: string) => {
	const number = Number(value);
	return isTypeOfNumber(number);
};

// console.log(1, isNumber(1));
// console.log('-1', isNumber('-1'));
// console.log('test', isNumber('test'));
// console.log('-Infinity', isNumber('-Infinity'));
// console.log(NaN, isNumber(NaN));

export const isOperator = (value: unknown): value is Operators =>
	(value as Operators) in OPERATORS;

type StrictFormulaOperatorsArray = Permutations<FormulaOperators>;

const FORMULA_OPERATOR: StrictFormulaOperatorsArray = [
	'add',
	'subtract',
	'multiply',
	'divide',
	'lpar',
	'rpar',
];

export const isFormulaOperator = (value: unknown): value is FormulaOperators =>
	FORMULA_OPERATOR.includes(value as FormulaOperators);
