import { type FunctionalOperators } from '../../config.ts';

import { type Actions, type BaseActionPayload } from '../actions.ts';

import {
	initialCalculatorState,
	type CalculatorState,
	type FormulaItem,
	type Formula,
} from '../state.ts';

import {
	isFunction,
	isOperator,
	isValidNumber,
} from '../../../utils/assert.ts';

import { assertCondition, assertNotNull } from '../../../utils/types.ts';

const dispatchActionHandler: {
	[K in FunctionalOperators]: (
		prev: CalculatorState,
		payload: BaseActionPayload
	) => CalculatorState;
} = {
	clear() {
		return initialCalculatorState;
	},
	parenthesis(prev, payload) {
		console.log('@todo', payload);
		return prev;
	},
	erase(prev) {
		// @todo parenthesis
		if (prev.formula.length === 1) {
			return initialCalculatorState;
		}

		const last = prev.formula.at(-1);
		// const [nextToLast, last] = prev.formula.slice(-2, -1);

		assertNotNull(last);
		// assertNotNull(nextToLast);

		// @todo parenthesis
		// assume that nextToLast item is a operator
		let action: Actions = 'operator';

		const formula = prev.formula.slice(0, -1);
		const error = null;

		if (isValidNumber(last) && last.length > 1) {
			formula.push(last.slice(0, -1));
			action = 'digit';
		}

		return {
			action,
			formula,
			error,
		};
	},
	decimal(prev) {
		const last = prev.formula.at(-1);
		assertNotNull(last);

		if (!isOperator(last) && last.endsWith('.')) return prev;

		const action = 'digit';
		const error = null;

		const number: FormulaItem = isOperator(last) ? '0.' : `${last}.`;
		const formula: Formula = [...prev.formula.slice(0, -1), number];

		if (isValidNumber(last)) {
			return {
				action,
				formula: [...prev.formula.slice(0, -1), number],
				error,
			};
		}

		return {
			...prev,
		};
	},
	equals(prev, payload) {
		console.log('@todo', payload);
		return prev;
	},
	sign(prev, payload) {
		console.log('@todo', payload);
		return prev;
	},

	// [ACTIONS.DECIMAL](prev, { isOperation: wasOperation }) {
	// 	return {
	// 		...prev,
	// 		current: prev.isOperation ? `0.` : `${prev.current}.`,
	// 		isOperation: wasOperation,
	// 	};
	// },
	// [ACTIONS.EQUALS](prev, { isOperation: wasOperation }) {
	// 	const entries = [...prev.entries];
	// 	if (prev.isOperation) {
	// 		entries.pop();
	// 	}
	// 	const [nextToLastEntry, lastEntry] = entries.slice(-2);
	// 	if (
	// 		lastEntry === OPERATORS.SUBTRACT &&
	// 		(nextToLastEntry === OPERATORS.MULTIPLY ||
	// 			nextToLastEntry === OPERATORS.DIVIDE)
	// 	) {
	// 		entries.pop();
	// 		entries.push(`-${prev.current}`);
	// 	} else {
	// 		entries.push(prev.current);
	// 	}
	// 	const result = `${calculate(entries)}`;
	// 	return {
	// 		entries: [],
	// 		current: result,
	// 		isOperation: wasOperation,
	// 	};
	// },
};

export default (
	prev: CalculatorState,
	payload: BaseActionPayload
): CalculatorState => {
	assertCondition(isFunction(payload.value));
	return dispatchActionHandler[payload.value](prev, payload);
};
