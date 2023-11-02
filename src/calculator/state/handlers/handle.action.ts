import {
	type CalculatorState,
	type DispatchOtherActionHandler,
	type OtherAction,
	type OtherActionPayload,
} from '../types';

import { OPERATIONS, ACTIONS } from '../data';

import { initialCalculatorState } from '../reducer';

import calculate from '../../calculator';

const dispatchActionHandler: DispatchOtherActionHandler = {
	[ACTIONS.CLEAR]() {
		return initialCalculatorState;
	},
	[ACTIONS.ERASE](prev, { isOperation: wasOperation }) {
		// set to zero
		if (prev.current.length === 1 && prev.current !== '0') {
			return {
				...prev,
				current: '0',
				isOperation: wasOperation,
			};
		}

		// erase last digit
		const current = prev.current.substring(0, prev.current.length - 1);

		return {
			...prev,
			current,
			isOperation: wasOperation,
		};
	},
	[ACTIONS.DECIMAL](prev, { isOperation: wasOperation }) {
		return {
			...prev,
			current: prev.isOperation ? `0.` : `${prev.current}.`,
			isOperation: wasOperation,
		};
	},
	[ACTIONS.EQUALS](prev, { isOperation: wasOperation }) {
		const entries = [...prev.entries];

		if (prev.isOperation) {
			entries.pop();
		}

		const [nextToLastEntry, lastEntry] = entries.slice(-2);

		if (
			lastEntry === OPERATIONS.SUBTRACT &&
			(nextToLastEntry === OPERATIONS.MULTIPLY ||
				nextToLastEntry === OPERATIONS.DIVIDE)
		) {
			entries.pop();
			entries.push(`-${prev.current}`);
		} else {
			entries.push(prev.current);
		}

		const result = `${calculate(entries)}`;

		return {
			entries: [],
			current: result,
			isOperation: wasOperation,
		};
	},
};

export const handleOtherActionDispatch = (
	prev: CalculatorState,
	action: OtherAction,
	payload: OtherActionPayload
): CalculatorState => {
	return dispatchActionHandler[action](prev, payload);
};
