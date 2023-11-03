// import { OPERATORS, SIGNS } from '../calculator/config/data.ts';
import { SYMBOLS, type SymbolKeys } from '../calculator/config/config.ts';
import { Formula } from '../calculator/state/reducer.ts';

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

// replace operater string with symbol => add => +
export function displayFormula(array: Formula) {
	return array
		.map((item) =>
			Number.isNaN(Number(item)) ? SYMBOLS[item as SymbolKeys] : item
		)
		.join(' ');
}
