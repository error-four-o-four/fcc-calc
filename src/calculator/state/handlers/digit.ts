import { assertNotNull } from '../../../utils/types.ts';

import { type CalculatorState } from '../state.ts';
import { type BaseActionPayload } from '../actions.ts';

export const appendDigit = (last: string, digit: string) => {
	const value = last === '0' ? digit : last + digit;

	// constrain maximum digits
	const limit = 15;
	if (value.length > limit) {
		return {
			number: last,
			error: `Maximum number of digits (${limit}) exceeded`,
		};
	}

	// constrain maximum fraction
	const limitFraction = 10;
	if (value.includes('.') && value.split('.')[1].length > limitFraction) {
		return {
			number: last,
			error: `Maximum number of digits after the decimal point is ${limitFraction}`,
		};
	}

	return {
		number: value,
		error: null,
	};
};

export default (
	prev: CalculatorState,
	payload: BaseActionPayload
): CalculatorState => {
	const last = prev.formula.at(-1);
	assertNotNull(last);

	const { number, error } = appendDigit(last, payload.value);

	if (prev.action === 'digit') {
		return {
			...prev,
			formula: [...prev.formula.slice(0, -1), number],
			error,
		};
	}

	if (
		prev.action === 'operator' &&
		last === 'divide' &&
		payload.value === '0'
	) {
		return {
			...prev,
			error: `Invalid Input`,
		};
	}

	if (prev.action === 'operator') {
		return {
			...prev,
			action: 'digit',
			formula: [...prev.formula, payload.value],
			error: null,
		};
	}

	if (prev.action === 'function') {
		return {
			...prev,
			action: 'digit',
			formula: [...prev.formula.slice(0, -1), number],
			error,
		};
	}

	throw new Error('Missed a case');
};
