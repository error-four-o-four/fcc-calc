import { type CalculatorState } from './state.ts';
import { type DispatchedAction } from './actions.ts';

import handleDigitAction from './handlers/digit.ts';
import handleOperatorAction from './handlers/operator.ts';

export const initialCalculatorState: CalculatorState = {
	action: 'digit',
	formula: ['0'],
	error: null,
};

export function stateReducer(state: CalculatorState, action: DispatchedAction) {
	const { type, payload } = action;

	if (type === 'digit') {
		return handleDigitAction(state, payload);
	}

	return handleOperatorAction(state, payload);
}

// import { type CalculatorState } from "../calculator/state/reducer.ts";
// import { type Actions } from "../calculator/state/actions.ts";

// import { valueIsDigit } from '../../assets/utils.ts';

// const checkOmitOnNumber = (state: CalculatorState, value: number): boolean => {
// 	// when zero has been clicked before
// 	if (`${value}` === '0' && state.current === '0') return true;

// 	// when the limit is reached
// 	if (!state.isOperation && state.current.length > 11) {
// 		console.log('limit');
// 		return true;
// 	}

// 	// do not omit dispatch
// 	return false;
// };

// const checkOmitOnFunction = (
// 	state: CalculatorState,
// 	value: Functions
// ): boolean => {
// 	// when display shows '0' and user wants to clear the display
// 	if (value === 'clear' && state.current === '0' && !state.entries.length) {
// 		return true;
// 	}

// 	// when display show '0' and user wants to erase a digit
// 	if (value === 'erase' && state.current === '0') {
// 		return true;
// 	}

// 	// when current value alread has a decimal point
// 	if (
// 		value === 'decimal' &&
// 		state.current.includes('.') &&
// 		!state.isOperation
// 	) {
// 		return true;
// 	}

// 	// do not omit dispatch
// 	return false;
// };

// export const stateUpdateIsRequired = (
// 	state: CalculatorState,
// 	action: Actions,
// 	value: string
// ): boolean => {
// 	return false;

// 	// return typeof value === 'number'
// 	// 	? checkOmitOnNumber(state, value)
// 	// 	: action === 'function'
// 	// 	? checkOmitOnFunction(state, value as Functions)
// 	// 	: false;
// };
