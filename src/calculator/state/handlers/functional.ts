import type { FunctionalOperators } from '../../config.ts';
import type { FunctionalActionPayload, ExtendedPayload } from '../actions.ts';
import type { CalculatorState, Formula } from '../state.ts';

import { initialCalculatorState } from '../state.ts';

const dispatchActionHandler: {
	[K in FunctionalOperators]: (
		prev: CalculatorState,
		payload: ExtendedPayload<FunctionalActionPayload>
	) => CalculatorState;
} = {
	clear() {
		return initialCalculatorState;
	},
	// parenthesis(prev, payload) {
	// 	console.log('@todo', payload);
	// 	return prev;
	// },
	erase(prev, payload) {
		const { last, lastIsOperator } = payload;

		if (prev.formula.length === 1 && last.length === 1) {
			return initialCalculatorState;
		}

		// @todo parenthesis
		// assume that nextToLast item is a operator

		// const [nextToLast, last] = prev.formula.slice(-2, -1);
		// assertNotNull(nextToLast);

		const formula = prev.formula.slice(0, -1);
		const error = null; // @todo consider

		if (!lastIsOperator && last.length > 1) {
			formula.push(last.slice(0, -1));
		}

		return {
			...prev,
			formula,
			error,
		};
	},
	// sign(prev, payload) {
	// 	const { last, lastIsOperator } = payload;

	// 	const formula: Formula = !lastIsOperator
	// 		? [...prev.formula.slice(0, -1), 'negate', last]
	// 		: [...prev.formula, 'negate'];

	// 	const error = null; // @todo consider

	// 	return {
	// 		formula,
	// 		error,
	// 	};
	// },
	decimal(prev, payload) {
		const { last, lastIsOperator } = payload;

		// @todo => stateUpdateISRequired
		if (!lastIsOperator && last.endsWith('.')) return prev;

		const error = null;

		let number: string;
		let formula: Formula;

		if (!lastIsOperator) {
			number = `${last}.`;
			formula = [...prev.formula.slice(0, -1), number];
		} else {
			number = '0.';
			formula = [...prev.formula, number];
		}

		return {
			...prev,
			formula,
			error,
		};
	},
	equals(prev, payload) {
		const { lastIsOperator } = payload;

		if (lastIsOperator) {
			return {
				...prev,
				error: 'Invalid Input.',
			};
		}

		if (!prev.result) {
			return prev;
		}

		return {
			formula: [prev.result],
			result: null,
			error: null,
		};
	},

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
	payload: ExtendedPayload<FunctionalActionPayload>
): CalculatorState => {
	return dispatchActionHandler[payload.value](prev, payload);
};
