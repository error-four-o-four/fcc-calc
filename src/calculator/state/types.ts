import { DIGITS, OPERATIONS, ACTIONS } from './data';

export interface CalculatorState {
	entries: string[];
	current: string;
	isOperation: boolean;
}

export type Digit = `${DIGITS}`;
export type Operation = `${OPERATIONS}`;

export type Action = `${ACTIONS}`;
export type OtherAction = Exclude<Action, 'digit' | 'operation'>;


export type DigitActionPayload = {
	value: string;
	isOperation: false;
}

export type OperationActionPayload = {
	value: Operation;
	isOperation: true;
}

export type OtherActionPayload = {
	isOperation: false;
}

export type DispatchAction =
	| {
			type: `${ACTIONS.DIGIT}`;
			payload: DigitActionPayload;
	  }
	| {
			type: `${ACTIONS.OPERATION}`;
			payload: OperationActionPayload;
	  }
	| {
			type: OtherAction;
			payload: OtherActionPayload;
	  };

export type DispatchOtherActionHandler = {
	[K in OtherAction]: (
		prev: CalculatorState,
		payload: OtherActionPayload
	) => CalculatorState;
};
