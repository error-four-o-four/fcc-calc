import { type Actions } from '../state/actions.ts';

import {
	type SymbolKeys,
	type DigitKeys,
	type Symbols,
	type Digits,
} from './config.ts';

type ButtonData = Readonly<{
	action: Actions;
	data: SymbolKeys | DigitKeys;
	text: Symbols | Digits;
}>;

export const buttons: ButtonData[] = [
	// first row
	{ action: 'function', data: 'clear', text: 'AC' },
	{ action: 'function', data: 'parenthesis', text: '()' },
	{ action: 'function', data: 'erase', text: '⌫' },
	{ action: 'operator', data: 'divide', text: '÷' },

	// second row
	{ action: 'digit', data: 'seven', text: '7' },
	{ action: 'digit', data: 'eight', text: '8' },
	{ action: 'digit', data: 'nine', text: '9' },
	{ action: 'operator', data: 'multiply', text: '×' },

	// third row
	{ action: 'digit', data: 'four', text: '4' },
	{ action: 'digit', data: 'five', text: '5' },
	{ action: 'digit', data: 'six', text: '6' },
	{ action: 'operator', data: 'subtract', text: '−' },

	// fourth row
	{ action: 'digit', data: 'one', text: '1' },
	{ action: 'digit', data: 'two', text: '2' },
	{ action: 'digit', data: 'three', text: '3' },
	{ action: 'operator', data: 'add', text: '+' },

	// fifth row
	{ action: 'function', data: 'sign', text: '±' },
	{ action: 'digit', data: 'zero', text: '0' },
	{ action: 'function', data: 'decimal', text: '.' },
	{ action: 'function', data: 'equals', text: '=' },
];
