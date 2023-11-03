import { type CalculatorState, type Formula } from '../reducer.ts';
import { type BaseActionPayload } from '../actions.ts';

import { isNumber } from '../../../utils/parser.ts';

import calculate from '../../logic/logic.ts';

const countNumberItems = (array: Formula) =>
	array.reduce((count, item) => (isNumber(item) ? count + 1 : count), 0);

const getResult = (array: Formula) =>
	countNumberItems(array) < 2 ? '' : calculate(array);

export default (
	prev: CalculatorState,
	payload: BaseActionPayload
): CalculatorState => {
	const last = prev.formula.at(-1);

	if (prev.action === 'digit') {
		const value = last === '0' ? payload.value : last + payload.value;
		const formula = [...prev.formula.slice(0, -1), value];

		return {
			...prev,
			formula,
		};
	}

	if (
		prev.action === 'operator' &&
		prev.formula.at(-1) === 'divide' &&
		payload.value === '0'
	) {
		console.warn('@todo');
		return prev;
	}

	if (prev.action === 'operator') {
		const formula = [...prev.formula, payload.value];
		const result = getResult(formula);

		return {
			...prev,
			action: 'digit',
			formula,
			result,
		};
	}

	console.log("@todo: handle digit action when last action was 'function'");
	return {
		...prev,
		action: 'digit',
	};
};
