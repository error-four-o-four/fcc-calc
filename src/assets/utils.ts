import { ACTIONS, OPERATIONS } from '../calculator/state/data.js';

export function assertNotNull(
	value: unknown
): asserts value is NonNullable<typeof value> {
	if (value === null) throw new Error('Argument is null!');
}

export function assertInstanceOf<T>(
	element: unknown,
	expected: new () => T
): asserts element is T {
	if (!element || !(element instanceof expected)) {
		const received = !element ? 'null' : element.constructor.name;
		throw new Error(
			`Expected element to be a ${expected.name}, but was ${received}`
		);
	}
}

function isInEnum<T extends Record<keyof T, string>>(dict: T, value: string) {
	return Object.values(dict).includes(value as unknown as T);
}

export function valueIsDigit(value: string | undefined) {
	return (value && !Number.isNaN(value)) || false;
}

export function valueIsOperation(value: string | undefined) {
	return (value && isInEnum(OPERATIONS, value)) || false;
}

export function valueIsAction(value: string | undefined) {
	return (value && isInEnum(ACTIONS, value)) || false;
}

export function parse(value: string) {
	return Number.isInteger(value) ? parseInt(value, 10) : parseFloat(value);
}

export function decimalLength(value: number) {
	const parts = value.toString().split('.');
	return !parts[1] ? 0 : parts[1].length;
}
