import { Action, Operation } from './types';

export enum DIGITS {
	ZERO,
	ONE,
	TWO,
	THREE,
	FOUR,
	FIVE,
	SIX,
	SEVEN,
	EIGHT,
	NINE,
}

export enum OPERATIONS {
	ADD = 'add',
	SUBTRACT = 'subtract',
	MULTIPLY = 'multiply',
	DIVIDE = 'divide',
}

export enum ACTIONS {
	DIGIT = 'digit',
	OPERATION = 'operation',
	CLEAR = 'clear',
	ERASE = 'erase',
	DECIMAL = 'decimal',
	EQUALS = 'equals',
}

export const SIGNS = {
	ADD: '+',
	SUBTRACT: '−',
	MULTIPLY: '×',
	DIVIDE: '÷',
	CLEAR: 'AC',
	ERASE: '⌫',
	DECIMAL: '.',
	EQUALS: '=',
};

export const buttons: {
	action: Action;
	text: string;
	value?: number | Operation;
}[] = [
	// first row
	{ action: ACTIONS.CLEAR, text: SIGNS.CLEAR },
	{ action: ACTIONS.ERASE, text: SIGNS.ERASE },
	{ action: ACTIONS.OPERATION, text: SIGNS.DIVIDE, value: OPERATIONS.DIVIDE },

	// second row
	{ action: ACTIONS.DIGIT, text: '7', value: DIGITS.SEVEN },
	{ action: ACTIONS.DIGIT, text: '8', value: DIGITS.EIGHT },
	{ action: ACTIONS.DIGIT, text: '9', value: DIGITS.NINE },
	{
		action: ACTIONS.OPERATION,
		text: SIGNS.MULTIPLY,
		value: OPERATIONS.MULTIPLY,
	},

	// third row
	{ action: ACTIONS.DIGIT, text: '4', value: DIGITS.FOUR },
	{ action: ACTIONS.DIGIT, text: '5', value: DIGITS.FIVE },
	{ action: ACTIONS.DIGIT, text: '6', value: DIGITS.SIX },
	{
		action: ACTIONS.OPERATION,
		text: SIGNS.SUBTRACT,
		value: OPERATIONS.SUBTRACT,
	},

	{ action: ACTIONS.DIGIT, text: '1', value: DIGITS.ONE },
	{ action: ACTIONS.DIGIT, text: '2', value: DIGITS.TWO },
	{ action: ACTIONS.DIGIT, text: '3', value: DIGITS.THREE },
	{ action: ACTIONS.OPERATION, text: SIGNS.ADD, value: OPERATIONS.ADD },

	{ action: ACTIONS.DIGIT, text: '0', value: DIGITS.ZERO },
	{ action: ACTIONS.DECIMAL, text: SIGNS.DECIMAL },
	{ action: ACTIONS.EQUALS, text: SIGNS.EQUALS },
];
