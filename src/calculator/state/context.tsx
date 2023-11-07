import type { Dispatch, PropsWithChildren } from 'react';
import { createContext, useReducer } from 'react';

import type { CalculatorState } from './state.ts';
import type { DispatchedAction } from './actions.ts';

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

	return (
		<CalculatorStateContext.Provider value={state}>
			<CalculatorDispatchContext.Provider value={dispatch}>
				{children}
			</CalculatorDispatchContext.Provider>
		</CalculatorStateContext.Provider>
	);
}
