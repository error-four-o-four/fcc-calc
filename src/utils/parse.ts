// import { OPERATORS, SIGNS } from '../calculator/config/data.ts';

// function formatWholePart(string: string) {
// 	return string
// 		.split('')
// 		.reverse()
// 		.reduce(
// 			(all, item, i) =>
// 				i % 3 !== 0 || i === 0 ? [...all, item] : [...all, ',', item],
// 			[] as string[]
// 		)
// 		.reverse()
// 		.join('');
// }

// export function displayItem(string: INumberItem) {
// 	const isDecimal = string.includes('.');

// 	if (isDecimal) {
// 		const [whole, fraction] = string.split('.');
// 		return `${formatWholePart(whole)}.${fraction}`;
// 	}

// 	return formatWholePart(string);
// }

// export function formatNumber(string: string) {
// 	const isDecimal = string.includes('.');

// 	if (isDecimal) {
// 		const [whole, fraction] = string.split('.');
// 		return `${formatWholePart(whole)}.${fraction}`;
// 	}

// 	return formatWholePart(string);
// }

// formatNumber('12345678901234');

export function parseNumber(value: string) {
	return Number.isInteger(value) ? parseInt(value, 10) : parseFloat(value);
}

export function decimalLength(value: number) {
	const parts = value.toString().split('.');
	return !parts[1] ? 0 : parts[1].length;
}
