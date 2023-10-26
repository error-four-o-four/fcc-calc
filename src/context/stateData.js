const NUMBER = 'number';
const OPERATION = 'operation';

export const TYPES = {
	NUMBER,
	OPERATION,
};

const ADD = 'add';
const SUBTRACT = 'subtract';
const MULTIPLY = 'multiply';
const DIVIDE = 'divide';

export const OPERATIONS = {
	ADD,
	SUBTRACT,
	MULTIPLY,
	DIVIDE,
};

const CLEAR = 'clear';
const ERASE = 'erase';
const DECIMAL = 'decimal';
const EQUALS = 'equals';

export const ACTIONS = {
	CLEAR,
	ERASE,
	DECIMAL,
	EQUALS,
};

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

export const buttons = [
	{ type: OPERATION, text: SIGNS.CLEAR, id: ACTIONS.CLEAR },
	{ type: OPERATION, text: SIGNS.ERASE, id: ACTIONS.ERASE },
	{ type: OPERATION, text: SIGNS.DIVIDE, id: OPERATIONS.DIVIDE },

	{ type: NUMBER, text: '7', id: 'seven' },
	{ type: NUMBER, text: '8', id: 'eight' },
	{ type: NUMBER, text: '9', id: 'nine' },
	{ type: OPERATION, text: SIGNS.MULTIPLY, id: OPERATIONS.MULTIPLY },

	{ type: NUMBER, text: '4', id: 'four' },
	{ type: NUMBER, text: '5', id: 'five' },
	{ type: NUMBER, text: '6', id: 'six' },
	{ type: OPERATION, text: SIGNS.SUBTRACT, id: OPERATIONS.SUBTRACT },

	{ type: NUMBER, text: '1', id: 'one' },
	{ type: NUMBER, text: '2', id: 'two' },
	{ type: NUMBER, text: '3', id: 'three' },
	{ type: OPERATION, text: SIGNS.ADD, id: OPERATIONS.ADD },

	{ type: NUMBER, text: '0', id: 'zero' },
	{ type: OPERATION, text: SIGNS.DECIMAL, id: ACTIONS.DECIMAL },
	{ type: OPERATION, text: SIGNS.EQUALS, id: ACTIONS.EQUALS },
];
