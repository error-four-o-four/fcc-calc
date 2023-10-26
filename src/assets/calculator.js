import { OPERATIONS } from '../context/stateData.js';
import { parse, decimalLength, isNumber, isOperation } from './utils.js';

const { ADD, SUBTRACT, MULTIPLY, DIVIDE } = OPERATIONS;

const Calc = {
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

Object.entries(Calc).forEach(([key, fn]) => {
	Calc[key] = (...args) => {
		const [a, b] = args.map((val) => parse(val));
		const precision = 10 ** Math.max(decimalLength(a), decimalLength(b));

		let result = fn.call(null, a * precision, b * precision);

		if (key === ADD || key === SUBTRACT) result /= precision;

		if (key === MULTIPLY) result /= precision * precision;

		return decimalLength(result) > 11
			? Math.floor(result * 1e10) / 1e10
			: result;
	};
});

export default function calculate(array) {
	const tmp = [];

	// calculate all multiplications and divisions
	for (let i = 0, ii = array.length; i < ii; i += 1) {
		const item = array[i];
		const next = array[i + 1];
		const prev = array[i - 1];

		if (isNumber(item) && (prev === MULTIPLY || prev === DIVIDE)) {
			continue;
		}

		if (isNumber(item) && (next === MULTIPLY || next === DIVIDE)) {
			continue;
		}

		if (isNumber(item) && (next === ADD || next === SUBTRACT)) {
			tmp.push(item);
			continue;
		}

		if (isNumber(item) && !next && i > 0) {
			tmp.push(item);
			continue;
		}

		if (item === ADD || item === SUBTRACT) {
			tmp.push(item);
			continue;
		}

		if (item === MULTIPLY || item === DIVIDE) {
			const result = Calc[item](prev, next);
			tmp.push(result);
		}
	}

	return tmp.reduce((prev, item, i, all) => {
		if (i === 0) return item;

		if (isOperation(item)) return prev;

		const operation = all[i - 1];
		return Calc[operation](prev, item);
	}, 0);
}
