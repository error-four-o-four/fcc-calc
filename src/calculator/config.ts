import { type ValueOf } from '../utils/types.ts';

export const DIGITS = {
	zero: '0',
	one: '1',
	two: '2',
	three: '3',
	four: '4',
	five: '5',
	six: '6',
	seven: '7',
	eight: '8',
	nine: '9',
} as const;

export const OPERATORS = {
	add: '+',
	subtract: '−',
	multiply: '×',
	divide: '÷',
	clear: 'AC',
	parenthesis: '()',
	lpar: '(',
	rpar: ')',
	erase: '⌫',
	sign: '±',
	decimal: '.',
	equals: '=',
} as const;

export type DigitKeys = keyof typeof DIGITS;
export type Digits = ValueOf<typeof DIGITS>;

export type Operators = keyof typeof OPERATORS;
export type OperatorSymbols = ValueOf<typeof OPERATORS>;

export type ArithmeticOperators = Extract<
	Operators,
	'add' | 'subtract' | 'multiply' | 'divide'
>;

export type FormulaOperators = Extract<
	Operators,
	ArithmeticOperators | 'lpar' | 'rpar'
>;

export type FunctionalOperators = Exclude<Operators, FormulaOperators>;
