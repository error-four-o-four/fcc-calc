import { useContext } from 'react';

import { assertCondition } from '../utils/types.ts';
import { isOperator, isValidNumber } from '../utils/assert.ts';

import { CalculatorStateContext } from '../calculator/state/context.tsx';
import { type Formula } from '../calculator/state/state.ts';

import { OPERATORS } from '../calculator/config.ts';
import calculate from '../calculator/logic/logic.ts';

const formatWholePart = (value: string) => {
	return value
		.split('')
		.reverse()
		.reduce(
			(all, item, i) =>
				i % 3 !== 0 || i === 0 ? [...all, item] : [...all, ',', item],
			[] as string[]
		)
		.reverse()
		.join('');
};

const renderNumber = (value: string) => {
	const isDecimal = value.includes('.');

	if (isDecimal) {
		const [whole, fraction] = value.split('.');
		return `${formatWholePart(whole)}.${fraction}`;
	}

	return formatWholePart(value);
};

// const renderSymbol = (value: string) => {
// 	assertCondition(isSymbolKey(value));
// 	return `
// 	<span class="display__operator">${SYMBOLS[value]}</span>;
// 	`;
// };

const renderFormula = (formula: Formula) =>
	formula
		.map((item) => {
			if (isValidNumber(item)) return renderNumber(item);

			assertCondition(isOperator(item));
			return OPERATORS[item];
		})
		.join('');

const countNumberItems = (formula: Formula) =>
	formula.reduce((count, item) => (isValidNumber(item) ? count + 1 : count), 0);

export default function Display() {
	const state = useContext(CalculatorStateContext);

	const renderedFormula = renderFormula(state.formula);
	const classNameSize =
		renderedFormula.length < 25 ? 'formula--large' : 'formula--small';

	const calculateResult =
		state.action === 'digit' && countNumberItems(state.formula) >= 2;

	const result = (calculateResult && calculate(state.formula)) || null;
	const renderedResult = (result && renderNumber(result)) || '';

	const renderedError = state.error ? state.error : '';

	return (
		<>
			<div id="formula" className={classNameSize}>
				{state.formula.map((item, index) => {
					if (isValidNumber(item)) return renderNumber(item);

					assertCondition(isOperator(item));
					const key = `operator-${index}`;
					return (
						<span key={key} className="display__operator">
							{OPERATORS[item]}
						</span>
					);
				})}
			</div>
			{/* <div id="formula">{renderFormula(state.formula)}</div> */}
			<div id="display">{renderedResult}</div>
			<div id="notification">{renderedError}</div>
		</>
	);
}
