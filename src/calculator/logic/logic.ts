import { type Operators } from '../config/config.ts';
import { type Formula, type ParsedFormula } from '../state/reducer.ts';

import { assertCondition } from '../../utils/types.ts';
import { isOperator, isNumber, parseNumber } from '../../utils/parser.ts';

import calculator from './calculator.ts';

const resolve = (
	formula: ParsedFormula,
	operator: Operators,
	index = formula.indexOf(operator)
) => {
	const a = formula[index - 1];
	const b = formula[index + 1];

	assertCondition(
		isNumber(a),
		`Expected the value to be a number while resolving '${operator}' - Received '${a}'`
	);

	assertCondition(
		isNumber(b),
		`Expected the value to be a number while resolving '${operator}' - Received '${b}'`
	);

	const c = calculator[operator](a, b);

	formula.splice(index - 1, 3, c);
};

// @todo
// const resolveParenthesis = () =>

const resolveAll = (
	operator: Extract<Operators, 'multiply' | 'divide'>,
	formula: ParsedFormula
) => {
	let index = formula.indexOf(operator);

	if (index < 0) return formula;

	while (index >= 0) {
		resolve(formula, operator, index);
		index = formula.indexOf(operator);
	}

	return formula;
};

const accumulate = (formula: ParsedFormula) => {
	if (formula.length === 1) return formula;

	let operator = formula.find((item) => typeof item === 'string');

	while (operator) {
		assertCondition(isOperator(operator));
		resolve(formula, operator);
		operator = formula.find((item) => typeof item === 'string');
	}

	return formula;
};

export default function calculate(formula: Formula) {
	let parsed = formula.map((item) =>
		isOperator(item) ? item : parseNumber(item)
	);

	// function is only called when the last action was of type 'digit'
	assertCondition(
		isNumber(parsed[0]),
		`Expected the first value to be a number - Received '${parsed[0]}'`
	);

	assertCondition(
		isNumber(parsed.at(-1)),
		`Expected the last value to be a number - Received '${parsed.at(-1)}'`
	);

	parsed = resolveAll('multiply', parsed);
	parsed = resolveAll('divide', parsed);
	parsed = accumulate(parsed);

	assertCondition(parsed.length === 1);

	return `${parsed[0]}`;
}
