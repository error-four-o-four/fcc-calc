import { OPERATIONS, SIGNS } from '../calculator/state/data.js';
import { valueIsDigit } from './utils.js';

function formatWholePart(string) {
	return string
		.split('')
		.reverse()
		.reduce(
			(all, item, i) =>
				i % 3 !== 0 || i === 0 ? [...all, item] : [...all, ',', item],
			[]
		)
		.reverse()
		.join('');
}

export function formatNumber(value) {
	const string =
		typeof value === 'number'
			? `${value}`
			: typeof value === 'string'
			? value
			: null;

	if (string === null) throw new Error('morp');

	const isDecimal = string.includes('.');

	if (isDecimal) {
		const [whole, fraction] = string.split('.');
		return `${formatWholePart(whole)}.${fraction}`;
	}

	return formatWholePart(string);
}

formatNumber('12345678901234');

function findSign(item) {
	const [key] = Object.entries(OPERATIONS).find(
		([, value]) => item === value
	) || [null];

	return key ? SIGNS[key] : '';
}

export function formatFormula(array) {
	return (
		array
			// .map((item) => {
			//   if (isNumber(item)) return item;

			//   const [key] = Object.entries(OPERATIONS).find(
			//     ([, value]) => item === value
			//   );
			//   return SIGNS[key];
			// })
			.map((item) => (valueIsDigit(item) ? item : findSign(item)))
			.join(' ')
	);
}
