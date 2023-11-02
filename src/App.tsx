import { useEffect, useReducer } from 'react';

import { Operation, OtherAction } from './calculator/state/types.js';
import { ACTIONS, buttons } from './calculator/state/data.js';

import {
	stateReducer,
	initialCalculatorState,
	stateDispatcher,
} from './calculator/state/reducer.js';

import {
	omitDispatch,
	getActionKey,
	getActionValue,
} from './calculator/state/utils.js';

import { assertInstanceOf } from './assets/utils.js';
import { formatNumber, formatFormula } from './assets/formatters.js';

export default function App() {
	const [state, dispatch] = useReducer(stateReducer, initialCalculatorState);

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		assertInstanceOf(e.target, HTMLButtonElement);

		const type = getActionKey(e.target.id);

		if (!type) return;

		const value = getActionValue(e.target.value);

		if (omitDispatch(state, type, value)) return;

		stateDispatcher(dispatch, type, value);
	};

	useEffect(() => {
		console.log(state);
	});

	return (
		<div className="App">
			<div id="formula">{formatFormula(state.entries)}</div>
			<div id="display">{formatNumber(state.current)}</div>
			<div id="buttons">
				{buttons.map(({ action, text, value }) => {
					const id =
						value && (action === ACTIONS.DIGIT || ACTIONS.OPERATION)
							? `${action}-${value}`
							: action;

					return (
						<button
							key={id}
							id={id}
							className={`btn-calculator btn-${action}`}
							value={!!value ? `${value}` : ''}
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
