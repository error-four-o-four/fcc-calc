import {
	type CalculatorState,
	type Action,
	type OtherAction,
	type Operation,
	type DispatchAction,
} from './types.js';

import { ACTIONS } from './data.js';

import { handleDigitActionDispatch } from './handlers/handle.digit.js';
import { handleOperationActionDispatch } from './handlers/handle.operation.js';
import { handleOtherActionDispatch } from './handlers/handle.action.js';

export const initialCalculatorState: CalculatorState = {
	entries: [],
	current: '0',
	isOperation: false,
};

export function stateDispatcher(dispatch: React.Dispatch<DispatchAction>, type: Action, value: string | Operation | undefined) {
	if (type === ACTIONS.DIGIT && value) {
		dispatch({
			type,
			payload: {
				value,
				isOperation: false,
			},
		});
		return;
	}

	if (type === ACTIONS.OPERATION && value) {
		dispatch({
			type,
			payload: {
				value: value as Operation,
				isOperation: true,
			},
		});
		return;
	}

	dispatch({
		type: type as OtherAction,
		payload: {
			isOperation: false,
		},
	});
}

export function stateReducer(state: CalculatorState, action: DispatchAction) {
	const { type, payload } = action;

	if (type === ACTIONS.DIGIT) {
		return handleDigitActionDispatch(state, payload);
	}

	if (type === ACTIONS.OPERATION) {
		return handleOperationActionDispatch(state, payload);
	}

	return handleOtherActionDispatch(state, type, payload)
}
