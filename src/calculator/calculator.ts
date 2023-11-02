import { OPERATIONS } from './state/data.js';
import { Operation } from './state/types.js';

import {
	decimalLength,
	valueIsDigit,
	valueIsOperation,
} from '../assets/utils.js';

const { ADD, SUBTRACT, MULTIPLY, DIVIDE } = OPERATIONS;

const Calc: {
	[x: string]: (a: number, b: number) => number;
} = {
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
		// @todo case b === 0
		return a / b;
	},
};

// https://stackoverflow.com/questions/5037839/avoiding-problems-with-javascripts-weird-decimal-calculations
// https://stackoverflow.com/questions/44949148/node-giving-strange-output-on-sum-of-particular-float-digits/44949594#44949594

Object.entries(Calc).forEach(([key, fn]) => {
	Calc[key] = (a, b) => {
		// const [a, b] = args.map((val) => parse(val));
		const precision = 10 ** Math.max(decimalLength(a), decimalLength(b));

		let result = fn.call(null, a * precision, b * precision);

		if (key === ADD || key === SUBTRACT) result /= precision;

		if (key === MULTIPLY) result /= precision * precision;

		return decimalLength(result) > 11
			? Math.floor(result * 1e10) / 1e10
			: result;
	};
});

function parseNumber(value: string) {
	if (isNaN(Number(value))) throw Error(`${value} is not a v alid number`);
	return Number.isInteger(value) ? parseInt(value, 10) : parseFloat(value);
}

export default function calculate(array: string[]) {
	const tmp = [];

	// calculate all multiplications and divisions
	for (let i = 0, ii = array.length; i < ii; i += 1) {
		const item = array[i];
		const prev = array[i - 1];
		const next = array[i + 1];

		if (valueIsDigit(item)) {
			const number = parseNumber(item);

			if (!next && i > 0) {
				tmp.push(number);
				continue;
			}

			if (!valueIsOperation(next)) {
				throw Error(
					`Expected next value to be an Operation but received: ${next}`
				);
			}

			const operation = next as Operation;

			if (operation === 'multiply' || operation === 'divide') continue;

			if (operation === 'add' || operation === 'subtract') {
				tmp.push(number);
				continue;
			}
		}

		if (valueIsOperation(item)) {
			const operation = item as Operation;

			if (operation === 'add' || operation === 'subtract') {
				tmp.push(operation);
				continue;
			}

			if (operation === MULTIPLY || operation === DIVIDE) {
				const a = parseNumber(prev);
				const b = parseNumber(next);
				const result = Calc[item](a, b);
				tmp.push(result);
			}
		}

		// if (valueIsDigit(item) && (prev === MULTIPLY || prev === DIVIDE)) {
		// 	continue;
		// }

		// if (valueIsDigit(item) && (next === MULTIPLY || next === DIVIDE)) {
		// 	continue;
		// }

		// if (valueIsDigit(item) && (next === ADD || next === SUBTRACT)) {
		// 	tmp.push(item);
		// 	continue;
		// }

		// if (valueIsDigit(item) && !next && i > 0) {
		// 	tmp.push(parseNumber(item));
		// 	continue;
		// }

		// if (item === ADD || item === SUBTRACT) {
		// 	tmp.push(item);
		// 	continue;
		// }

		// if (item === MULTIPLY || item === DIVIDE) {
		// 	const result = Calc[item](parseNumber(prev), parseNumber(next));
		// 	tmp.push(result);
		// }
	}

	return tmp.reduce((prev, item, i, all) => {
		if (i === 0) return item;

		if (typeof item === 'string' && valueIsOperation(item)) return prev;

		const operation = all[i - 1];

		if (typeof operation === 'number')
			throw new Error('Expected operation but received number');

		if (typeof prev === 'string')
			throw new Error('Expected number but received string');

		return Calc[operation](prev, item);
	}, 0);
}
