import { type CalculatorState, type Action } from './types.js';

import { ACTIONS } from './data.js';

import { valueIsAction, valueIsDigit } from '../../assets/utils.js';

const checkOmitOnNumber = (
	state: CalculatorState,
	value: string | undefined
): boolean => {
	// when zero has been clicked before
	if (value === '0' && state.current === '0') return true;

	// when the limit is reached
	if (!state.isOperation && state.current.length > 11) {
		console.log('limit');
		return true;
	}

	// do not omit dispatch
	return false;
};

const checkOmitOnAction = (
	state: CalculatorState,
	value: string | undefined
): boolean => {
	// when display shows '0' and user wants to clear the display
	if (
		value === ACTIONS.CLEAR &&
		state.current === '0' &&
		!state.entries.length
	) {
		return true;
	}

	// when display show '0' and user wants to erase a digit
	if (value === ACTIONS.ERASE && state.current === '0') {
		return true;
	}

	// when current value alread has a decimal point
	if (
		value === ACTIONS.DECIMAL &&
		state.current.includes('.') &&
		!state.isOperation
	) {
		return true;
	}

	// do not omit dispatch
	return false;
};

export const omitDispatch = (
	state: CalculatorState,
	action: Action,
	value: string | undefined
): boolean => {
	return valueIsDigit(action)
		? checkOmitOnNumber(state, value)
		: valueIsAction(action)
		? checkOmitOnAction(state, value)
		: false;
};

export function getActionKey(value: string): Action | null {
	return value.startsWith(ACTIONS.DIGIT)
		? ACTIONS.DIGIT
		: value.startsWith(ACTIONS.OPERATION)
		? ACTIONS.OPERATION
		: valueIsAction(value)
		? ACTIONS[value as unknown as keyof typeof ACTIONS]
		: null;
}

export function getActionValue(value: string) {
	return !value || !value.length ? undefined : value;
}
