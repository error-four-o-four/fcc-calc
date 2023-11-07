import type { CalculatorState } from '../state.ts';
import type { OperatorActionPayload, ExtendedPayload } from '../actions.ts';

export default (
	prev: CalculatorState,
	payload: ExtendedPayload<OperatorActionPayload>
): CalculatorState => {
	const { last, lastIsOperator, value } = payload;

	const error = null;

	if (!lastIsOperator) {
		return {
			...prev,
			formula: [...prev.formula, value],
			error,
		};
	}

	if ((last === 'multiply' || last === 'divide') && value === 'subtract') {
		return {
			...prev,
			formula: [...prev.formula, value],
			error,
		};
	}

	return {
		...prev,
		formula: [...prev.formula.slice(0, -1), value],
		error,
	};
};
