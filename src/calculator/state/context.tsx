import {
	createContext,
	useReducer,
	type Dispatch,
	type PropsWithChildren,
} from 'react';

import { initialCalculatorState, type CalculatorState } from './state.ts';

import { stateReducer } from './reducer.ts';
import { type DispatchedAction } from './actions.ts';

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
