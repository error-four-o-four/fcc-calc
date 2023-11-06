import { useContext } from 'react';

import { type Actions } from '../calculator/state/actions.ts';

import {
	type OperatorSymbols,
	type Operators,
	type Digits,
	type DigitKeys,
} from '../calculator/config.ts';

import { CalculatorDispatchContext } from '../calculator/state/context.tsx';

export type ButtonProps = {
	action: Actions;
	data: Operators | DigitKeys;
	text: OperatorSymbols | Digits;
};

export default function Button({ action, data, text }: ButtonProps) {
	const dispatch = useContext(CalculatorDispatchContext);

	const id = data;
	const value = action === 'digit' ? text : data;

	const handleClick = () => {
		console.log(action);
		dispatch({
			type: action,
			payload: {
				value,
			},
		});
	};

	return (
		<button
			id={id}
			className={`btn-calculator btn-${action}`}
			value={value}
			type="button"
			onClick={handleClick}>
			{text}
		</button>
	);
}
