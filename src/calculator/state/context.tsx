import type { Dispatch, PropsWithChildren } from 'react';
import { createContext, useEffect, useReducer } from 'react';

import {
	type DigitValues,
	type ArithmeticOperators,
	type FunctionalOperators,
} from '../config.ts';

import type { CalculatorState } from './state.ts';
import type { DispatchedAction } from './actions.ts';

import { isValidNumber } from '../../utils/confirm.ts';
import { initialCalculatorState } from './state.ts';
import { stateReducer } from './reducer.ts';

export const CalculatorStateContext = createContext<CalculatorState>(
	initialCalculatorState
);

export const CalculatorDispatchContext = createContext<
	Dispatch<DispatchedAction>
>(() => {});

export default function Calculator({ children }: PropsWithChildren) {
	const [state, dispatch] = useReducer(stateReducer, initialCalculatorState);

	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			const { key } = e;
			if (isValidNumber(e.key)) {
				dispatch({
					type: 'digit',
					payload: {
						value: key as DigitValues,
					},
				});
			}

			// @todo hack!
			const mapKeyToArithmetic: {
				[x: string]: ArithmeticOperators;
			} = {
				'+': 'add',
				'-': 'subtract',
				'*': 'multiply',
				'/': 'divide',
			};

			if (key in mapKeyToArithmetic) {
				dispatch({
					type: 'operator',
					payload: {
						value: mapKeyToArithmetic[key],
					},
				});
			}

			const mapKeyToFunctional: {
				[x: string]: FunctionalOperators;
			} = {
				'.': 'decimal',
				Backspace: 'erase',
				Enter: 'equals',
				'=': 'equals',
			};

			if (key in mapKeyToFunctional) {
				dispatch({
					type: 'functional',
					payload: {
						value: mapKeyToFunctional[key],
					},
				});
			}
		};

		document.addEventListener('keyup', handleKeyPress);
		return () => document.removeEventListener('keyup', handleKeyPress);
	}, []);

	return (
		<CalculatorStateContext.Provider value={state}>
			<CalculatorDispatchContext.Provider value={dispatch}>
				{children}
			</CalculatorDispatchContext.Provider>
		</CalculatorStateContext.Provider>
	);
}
