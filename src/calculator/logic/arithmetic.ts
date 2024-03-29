import { type ArithmeticOperators } from '../config.ts';

import { assertCondition } from '../../utils/assert.ts';
import { isArithmeticOperator } from '../../utils/confirm.ts';
import { getDecimalLength } from '../../utils/parse.ts';

type Calculator = {
	[K in ArithmeticOperators]: (a: number, b: number) => number;
};

const calculator = <Calculator>{
	add(a, b) {
		return a + b;
	},
	subtract(a, b) {
		return a - b;
	},
	multiply(a, b) {
		return a * b;
	},
	divide(a, b) {
		return a / b;
	},
};

// https://stackoverflow.com/questions/5037839/avoiding-problems-with-javascripts-weird-decimal-calculations
// https://stackoverflow.com/questions/44949148/node-giving-strange-output-on-sum-of-particular-float-digits/44949594#44949594

Object.entries(calculator).forEach(([key, fn]) => {
	assertCondition(isArithmeticOperator(key));

	calculator[key] = (a, b) => {
		const precision = 10 ** Math.max(getDecimalLength(a), getDecimalLength(b));

		let result = fn.call(null, a * precision, b * precision);

		if (key === 'add' || key === 'subtract') result /= precision;

		if (key === 'multiply') result /= precision * precision;

		return getDecimalLength(result) > 11
			? Math.floor(result * 1e10) / 1e10
			: result;
	};
});

export default calculator;
