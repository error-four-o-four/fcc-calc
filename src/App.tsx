import { useEffect, useReducer } from 'react';

import { assertInstanceOf } from './utils/types.ts';
import { displayFormula } from './utils/formatters.ts';

import { buttons } from './calculator/config/buttons.ts';

import {
	stateReducer,
	initialCalculatorState,
} from './calculator/state/reducer.ts';

import { type Actions } from './calculator/state/actions.ts';

export default function App() {
	const [state, dispatch] = useReducer(stateReducer, initialCalculatorState);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const button = e.target;
		assertInstanceOf(button, HTMLButtonElement);

		const type = button.id.split('-')[0] as Actions;
		const { value } = button;

		dispatch({
			type,
			payload: {
				value,
			},
		});
	};

	useEffect(() => {
		console.log(state);
	});

	return (
		<div className="App">
			<div id="formula">{displayFormula(state.formula)}</div>
			<div id="display">{state.result}</div>
			<div id="buttons">
				{buttons.map(({ action, text, data }) => {
					const key = `${action}-${data}`;
					const value = action === 'digit' ? text : data;

					return (
						<button
							key={key}
							id={key}
							className={`btn-calculator btn-${action}`}
							value={value}
							type="button"
							onClick={handleClick}>
							{text}
						</button>
					);
				})}
			</div>
		</div>
	);
}
