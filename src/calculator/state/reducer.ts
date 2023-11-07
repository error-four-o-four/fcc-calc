import type { CalculatorState } from './state.ts';
import type { Actions, DispatchedAction, TypedPayload } from './actions.ts';

import { parseFormula } from '../../utils/parse.ts';

import { getExtraPayload } from './actions.ts';

import handleDigitAction from './handlers/digit.ts';
import handleOperatorAction from './handlers/operator.ts';
import handleFunctionalAction from './handlers/functional.ts';

import {
	hasMinNumberItems,
	resolveNegations,
	calculate,
} from '../logic/logic.ts';

const handler: {
	[K in Actions]: (
		state: CalculatorState,
		payload: TypedPayload<K>
	) => CalculatorState;
} = {
	digit: handleDigitAction,
	operator: handleOperatorAction,
	functional: handleFunctionalAction,
};

export function stateReducer(state: CalculatorState, action: DispatchedAction) {
	const { type } = action;

	// extend properties 'last', 'lastIsOperator'
	const payload = {
		...action.payload,
		...getExtraPayload(state),
	};

	let updated: CalculatorState;

	// update state
	if (type === 'digit') {
		updated = handler[type](state, payload as TypedPayload<typeof type>);
	} else if (type === 'operator') {
		updated = handler[type](state, payload as TypedPayload<typeof type>);
	} else {
		updated = handler[type](state, payload as TypedPayload<typeof type>);
	}

	// removes 'subtract' items
	updated.formula = resolveNegations(updated.formula);

	const parsed = parseFormula(updated.formula);

	// calcuate the result, when
	const calculateResult =
		// there's no error message
		!updated.error &&
		// the last item is a number
		typeof parsed[parsed.length - 1] === 'number' &&
		// and there are at least two numbers
		hasMinNumberItems(parsed);

	updated.result = updated.error
		? null
		: (calculateResult && calculate(parsed).toString()) || null;

	return updated;
}
