import { useEffect, useReducer } from 'react';

import { buttons } from './context/stateData.js';

import {
	stateReducer,
	initialCalculatorState,
} from './context/stateReducer.js';

import {
	handleAction,
	handleNumber,
	handleOperation,
} from './assets/handlers.js';

import { formatNumber, formatFormula } from './assets/formatters.js';
import { isAction, isNumber, isOperation } from './assets/utils.js';

export default function App() {
	const [state, dispatch] = useReducer(stateReducer, initialCalculatorState);

	const handleClick = (e) => {
		const { id, value } = e.target;

		if (isNumber(value)) {
			handleNumber(value, state, dispatch);
			return;
		}

		if (isAction(id)) {
			handleAction(id, state, dispatch);
			return;
		}

		if (isOperation(id)) handleOperation(id, state, dispatch);
	};

	useEffect(() => {
		console.log(state);
	});

	return (
		<div className="App">
			<div id="formula">{formatFormula(state.formula)}</div>
			<div id="display">{formatNumber(state.current)}</div>
			<div id="buttons">
				{buttons.map(({ type, text, id }) => (
					<button
						key={id}
						id={id}
						className={`btn-${type}`}
						value={text}
						type="button"
						onClick={handleClick}>
						{text}
					</button>
				))}
			</div>
		</div>
	);
}
