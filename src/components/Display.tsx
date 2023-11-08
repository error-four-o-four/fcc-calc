import { useContext } from 'react';

import { assertCondition } from '../utils/assert.ts';
import { isOperatorInFormula, isValidNumber } from '../utils/confirm.ts';

import { OPERATORS } from '../calculator/config.ts';
import { CalculatorStateContext } from '../calculator/state/context.tsx';

const formatWholePart = (string: string) => {
	const isNegative = string.startsWith('-');

	let value = isNegative ? string.substring(1) : string;

	value = value
		.split('')
		.reverse()
		.reduce(
			(all, item, i) =>
				i % 3 !== 0 || i === 0 ? [...all, item] : [...all, ',', item],
			[] as string[]
		)
		.reverse()
		.join('');

	return isNegative ? `-${value}` : value;
};

const renderNumber = (value: string) => {
	if (value.includes('.')) {
		const [whole, fraction] = value.split('.');
		return `${formatWholePart(whole)}.${fraction}`;
	}

	return formatWholePart(value);
};

// const renderFormula = (formula: ParsedFormula) =>
// 	formula.map((item) =>
// 		typeof item === 'number' ? renderNumber(item) : OPERATORS[item]
// 	);

// const renderFormula = (formula: Formula) =>
// 	formula
// 		.map((item) => {
// 			// return isOperator(item) ? OPERATORS[item] : renderNumber(item);
// 			if (isValidNumber(item)) return renderNumber(item);

// 			assertCondition(isOperator(item));
// 			return OPERATORS[item];
// 		})
// 		.join('');

export default function Display() {
	const state = useContext(CalculatorStateContext);

	// console.log(state);

	// const renderedFormula = renderFormula(parsed);
	// const classNameSize =
	// renderedFormula.length < 25 ? 'formula--large' : 'formula--small';
	const classNameSize = 'formula--large';

	return (
		<>
			<div id="formula" className={classNameSize}>
				{state.formula.map((item, index) => {
					if (isValidNumber(item)) return renderNumber(item);

					assertCondition(isOperatorInFormula(item));
					const key = `operator-${index}`;
					return (
						<span key={key} className="display__operator">
							{OPERATORS[item]}
						</span>
					);
				})}
			</div>
			<div id="display">{state.result ? renderNumber(state.result) : ''}</div>
			<div id="notification">{state.error || ''}</div>
		</>
	);
}
