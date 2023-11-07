import { stringUnionToStrictArray } from './types.ts';

import type {
	Digits,
	Operators,
	ArithmeticOperators,
	FunctionalOperators,
} from '../calculator/config.ts';

import type { OperatorsInFormula } from '../calculator/state/state.ts';

import { OPERATORS } from '../calculator/config.ts';

export const isTypeOfNumber = (value: unknown) =>
	typeof value === 'number' &&
	!Number.isNaN(value) &&
	Math.abs(value) !== Infinity;

export const isValidNumber = (value: string) => {
	const number = Number(value);
	return isTypeOfNumber(number);
};

export const isNumber = (value: unknown): value is Digits =>
	isValidNumber(value as string);

// console.log(1, isNumber(1));
// console.log('-1', isNumber('-1'));
// console.log('test', isNumber('test'));
// console.log('-Infinity', isNumber('-Infinity'));
// console.log(NaN, isNumber(NaN));

export const isOperator = (value: unknown): value is Operators =>
	(value as Operators) in OPERATORS;

const ARITHMETIC_OPERATORS = stringUnionToStrictArray<ArithmeticOperators>()(
	'add',
	'subtract',
	'multiply',
	'divide'
);

export const isArithmeticOperator = (
	value: unknown
): value is ArithmeticOperators =>
	ARITHMETIC_OPERATORS.includes(value as ArithmeticOperators);

const FUNCTIONAL_OPERATORS = stringUnionToStrictArray<FunctionalOperators>()(
	'clear',
	'erase',
	// 'parenthesis',
	// 'sign',
	'decimal',
	'equals'
);

export const isFunctionalOperator = (
	value: unknown
): value is FunctionalOperators =>
	FUNCTIONAL_OPERATORS.includes(value as FunctionalOperators);

const FORMULA_ITEMS = stringUnionToStrictArray<OperatorsInFormula>()(
	'add',
	'subtract',
	'multiply',
	'divide'
	// 'lpar',
	// 'rpar',
	// 'negate'
);
export const isOperatorInFormula = (
	value: unknown
): value is OperatorsInFormula =>
	FORMULA_ITEMS.includes(value as OperatorsInFormula);
