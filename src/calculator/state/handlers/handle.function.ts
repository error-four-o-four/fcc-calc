import { type Functions } from '../../config/config.ts';

import { type BaseActionPayload } from '../actions.ts';
import { initialCalculatorState, type CalculatorState } from '../reducer.ts';

import { isFunction } from '../../../utils/parser.ts';
import { assertCondition } from '../../../utils/types.ts';

const dispatchActionHandler: {
	[K in Functions]: (
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
	erase(prev, payload) {
		// check operator or number
		// pop operator
		// slice numbber
		console.log('@todo', payload);
		return prev;
	},
	decimal(prev, payload) {
		console.log('@todo', payload);
		return prev;
	},
	equals(prev, payload) {
		console.log('@todo', payload);
		return prev;
	},
	sign(prev, payload) {
		console.log('@todo', payload);
		return prev;
	},

	// [ACTIONS.CLEAR]() {
	// 	return initialCalculatorState;
	// },
	// [ACTIONS.ERASE](prev, { isOperation: wasOperation }) {
	// 	// set to zero
	// 	if (prev.current.length === 1 && prev.current !== '0') {
	// 		return {
	// 			...prev,
	// 			current: '0',
	// 			isOperation: wasOperation,
	// 		};
	// 	}
	// 	// erase last digit
	// 	const current = prev.current.substring(0, prev.current.length - 1);
	// 	return {
	// 		...prev,
	// 		current,
	// 		isOperation: wasOperation,
	// 	};
	// },
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
