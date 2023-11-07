import type { ArithmeticOperators } from '../config.ts';
import type { Formula, ParsedFormula } from '../state/state.ts';

import { assertCondition, assertTypeOfNumber } from '../../utils/assert.ts';
import { isArithmeticOperator, isValidNumber } from '../../utils/confirm.ts';

import calculator from './arithmetic.ts';

const resolve = (
	formula: ParsedFormula,
	operator: ArithmeticOperators,
	index = formula.indexOf(operator)
) => {
	const a = formula[index - 1];
	const b = formula[index + 1];

	assertTypeOfNumber(a, `Resolving: '${a}' is not a number`);
	assertTypeOfNumber(b, `Resolving: '${b}' is not a number`);

	const c = calculator[operator](a, b);

	formula.splice(index - 1, 3, c);
};

// @todo implement 'sign' operator
// const resolveNegations = (formula: ParsedFormula) => {
// 	const key: Extract<OperatorsInFormula, 'negate'> = 'negate';

// 	let index = formula.indexOf(key);

// 	if (index < 0 || index === formula.length - 1) return;

// 	while (index >= 0) {
// 		const number = formula[index + 1];
// 		assertTypeOfNumber(number);

// 		formula.splice(index, 2, -1 * number);
// 		index = formula.indexOf(key);
// 	}
// };

export const resolveNegations = (formula: Formula) => {
	const key: Extract<ArithmeticOperators, 'subtract'> = 'subtract';

	// find the index of all 'subtract' items
	// which comes after an operator but before a number
	const indices = formula.reduce((all, item, index, array) => {
		if (isValidNumber(item)) return all;

		if (item !== key) return all;

		const prev = array[index - 1];

		if (isValidNumber(prev)) return all;

		return [...all, index];
	}, [] as number[]);

	if (indices.length === 0) return formula;

	for (let i = indices.length - 1; i >= 0; i -= 1) {
		const index = indices[i];

		if (index === formula.length - 1) continue;

		const next = formula[index + 1];
		assertCondition(isValidNumber(next));

		// merge 'subtract' and number
		formula.splice(index, 2, `-${next}`);
	}

	return formula;
};

// @todo
// const resolveParenthesis = () =>

const resolveAll = (
	operator: Extract<ArithmeticOperators, 'multiply' | 'divide'>,
	formula: ParsedFormula
) => {
	let index = formula.indexOf(operator);

	if (index < 0) return;

	while (index >= 0) {
		resolve(formula, operator, index);
		index = formula.indexOf(operator);
	}
};

const accumulate = (formula: ParsedFormula) => {
	if (formula.length === 1) return;

	let operator = formula.find((item) => typeof item === 'string');

	while (operator) {
		assertCondition(isArithmeticOperator(operator));
		resolve(formula, operator);
		operator = formula.find((item) => typeof item === 'string');
	}
};

export const hasMinNumberItems = (formula: ParsedFormula) => {
	let count = 0;

	for (let i = 0; i < formula.length; i += 1) {
		const item = formula[i];
		if (typeof item === 'number') count += 1;

		if (count > 1) return true;
	}

	return false;
};

export const calculate = (formula: ParsedFormula) => {
	// function is only called when the last action was of type 'digit'
	assertTypeOfNumber(formula.at(0));
	assertTypeOfNumber(formula.at(-1));

	const tmp = [...formula];

	resolveAll('multiply', tmp);
	resolveAll('divide', tmp);
	accumulate(tmp);

	assertCondition(tmp.length === 1, 'Nope');
	assertCondition(typeof tmp[0] === 'number', 'Nope');

	return tmp[0];
};
