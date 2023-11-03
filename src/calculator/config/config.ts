import { type TupleToUnion, type ValueOf } from '../../utils/types.ts';

export const DIGIT_KEYS = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
] as const;

export const DIGITS = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
] as const;

export const OPERATORS = ['add', 'subtract', 'multiply', 'divide'] as const;

export const FUNCTIONS = [
	'clear',
	'erase',
	'sign',
	'decimal',
	'parenthesis',
	'equals',
] as const;

export const SYMBOLS = {
	add: '+',
	subtract: '−',
	multiply: '×',
	divide: '÷',
	clear: 'AC',
	parenthesis: '()',
	erase: '⌫',
	sign: '±',
	decimal: '.',
	equals: '=',
} as const;

export type DigitKeys = TupleToUnion<typeof DIGIT_KEYS>;
export type Digits = TupleToUnion<typeof DIGITS>;

export type SymbolKeys = keyof typeof SYMBOLS;
export type Symbols = ValueOf<typeof SYMBOLS>;

export type Operators = (typeof OPERATORS)[number];
export type Functions = (typeof FUNCTIONS)[number];
