import { isTypeOfNumber } from './confirm.ts';

export function assertCondition(
	condition: boolean,
	message = 'Damn you typescript'
): asserts condition {
	if (!condition) throw new Error(message);
}

export function assertTypeOfNumber(
	value: unknown,
	message = `'${value as string}' is not a valid number`
): asserts value is number {
	if (!isTypeOfNumber(value)) throw new Error(message);
}

// export function assertNotNull(
// 	value: unknown
// ): asserts value is NonNullable<typeof value> {
// 	if (value === null) throw new Error('Argument is null!');
// }

// export function assertInstanceOf<T>(
// 	element: unknown,
// 	expected: new () => T
// ): asserts element is T {
// 	if (!element || !(element instanceof expected)) {
// 		const received = !element ? 'null' : element.constructor.name;
// 		throw new Error(
// 			`Expected element to be a ${expected.name}, but was ${received}`
// 		);
// 	}
// }
