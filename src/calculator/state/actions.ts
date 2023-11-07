import { isOperatorInFormula } from '../../utils/confirm.ts';

import type {
	DigitValues,
	ArithmeticOperators,
	FunctionalOperators,
} from '../config.ts';

import type { CalculatorState, FormulaItem } from './state.ts';

export type Actions = 'digit' | 'operator' | 'functional';

export type DigitActionPayload = {
	value: DigitValues;
};

export type OperatorActionPayload = {
	value: ArithmeticOperators;
};

export type FunctionalActionPayload = {
	value: FunctionalOperators;
};

export type DigitAction = {
	type: 'digit';
	payload: DigitActionPayload;
};

export type OperatorAction = {
	type: 'operator';
	payload: OperatorActionPayload;
};

export type FunctionalAction = {
	type: 'functional';
	payload: FunctionalActionPayload;
};

// export type DispatchedAction = DigitAction | OperatorAction | FunctionalAction;
export type DispatchedAction = {
	type: Actions;
	payload: DigitActionPayload | OperatorActionPayload | FunctionalActionPayload;
};

export type ExtendedPayload<T> = T & {
	last: FormulaItem;
	lastIsOperator: boolean;
};

export type TypedPayload<K extends Actions> = K extends 'digit'
	? ExtendedPayload<DigitActionPayload>
	: K extends 'operator'
	? ExtendedPayload<OperatorActionPayload>
	: K extends 'functional'
	? ExtendedPayload<FunctionalActionPayload>
	: never;

export function getExtraPayload(state: CalculatorState) {
	const last = state.formula[state.formula.length - 1];
	const lastIsOperator = isOperatorInFormula(last);

	return {
		last,
		lastIsOperator,
	};
}
