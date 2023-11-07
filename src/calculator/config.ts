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
	// parenthesis: '()',
	// lpar: '(',
	// rpar: ')',
	erase: '⌫',
	// sign: '±',
	decimal: '.',
	equals: '=',
} as const;

type DigitType = typeof DIGITS;
export type Digits = keyof DigitType;
export type DigitValues = ValueOf<DigitType>;

type OperatorType = typeof OPERATORS;
export type Operators = keyof OperatorType;
export type OperatorIcons = ValueOf<OperatorType>;

type ArithmeticOperatorType = Pick<
	OperatorType,
	'add' | 'subtract' | 'multiply' | 'divide'
>;

export type ArithmeticOperators = keyof ArithmeticOperatorType;
export type ArithmeticOperatorIcons = ValueOf<ArithmeticOperatorType>;

export type FunctionalOperatorType = Omit<
	OperatorType,
	ArithmeticOperators
	// ArithmeticOperators | 'lpar' | 'rpar'
>;
export type FunctionalOperators = keyof FunctionalOperatorType;
export type FunctionalOperatorIcons = ValueOf<FunctionalOperatorType>;
