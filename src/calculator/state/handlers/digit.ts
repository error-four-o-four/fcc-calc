import type { CalculatorState, FormulaItem } from '../state.ts';
import type { TypedPayload } from '../actions.ts';
import type { DigitValues } from '../../config.ts';

export const appendDigit = (last: FormulaItem, value: DigitValues) => {
	const number = last === '0' ? value : last + value;

	// constrain maximum digits
	const limit = 15;
	if (number.length > limit) {
		return {
			number: last,
			error: `Maximum number of digits (${limit}) exceeded`,
		};
	}

	// constrain maximum fraction
	const limitFraction = 10;
	if (number.includes('.') && number.split('.')[1].length > limitFraction) {
		return {
			number: last,
			error: `Maximum number of digits after the decimal point is ${limitFraction}`,
		};
	}

	return {
		number,
		error: null,
	};
};

export default (
	prev: CalculatorState,
	payload: TypedPayload<'digit'>
): CalculatorState => {
	const { last, lastIsOperator, value } = payload;

	let { number, error } = appendDigit(last, value);

	if (!lastIsOperator) {
		// pop previous number
		// push new number
		return {
			...prev,
			formula: [...prev.formula.slice(0, -1), number],
			error,
		};
	}

	number = payload.value;
	error = null;

	if (lastIsOperator && last === 'divide' && number === '0') {
		// do not divide by 0
		return {
			...prev,
			error: `Invalid Input: dividing by '0' is not possible`,
		};
	}

	// push new number
	return {
		...prev,
		formula: [...prev.formula, payload.value],
		error,
	};
};
