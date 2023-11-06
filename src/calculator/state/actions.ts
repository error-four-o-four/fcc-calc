import { type TupleToUnion } from '../../utils/types.ts';

const ACTION_KEYS = ['digit', 'operator'] as const;

export type Actions = TupleToUnion<typeof ACTION_KEYS>;

export type BaseActionPayload = {
	value: string;
};

interface BaseAction {
	type: Actions;
	payload: BaseActionPayload;
}

export interface DigitAction extends BaseAction {
	type: 'digit';
}

export interface OperatorAction extends BaseAction {
	type: 'operator';
}

export type DispatchedAction = DigitAction | OperatorAction;
