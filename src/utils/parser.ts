import {
	OPERATORS,
	FUNCTIONS,
	type Operators,
	type Functions,
} from '../calculator/config/config.ts';

export function isNumber(value: unknown): value is number {
	return !Number.isNaN(value);
}

export function parseNumber(value: string) {
	return Number.isInteger(value) ? parseInt(value, 10) : parseFloat(value);
}

export function decimalLength(value: number) {
	const parts = value.toString().split('.');
	return !parts[1] ? 0 : parts[1].length;
}

export const isOperator = (value: unknown): value is Operators => {
	return OPERATORS.includes(value as Operators);
};

export const isFunction = (value: string): value is Functions => {
	return FUNCTIONS.includes(value as Functions);
};
