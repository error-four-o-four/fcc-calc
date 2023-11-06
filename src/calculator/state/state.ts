import { type LiteralStringUnion } from '../../utils/types.ts';
import { type Actions } from './actions.ts';
import { type FormulaOperators } from '../config.ts';

// use LiteralStringUnion to disable https://typescript-eslint.io/rules/no-redundant-type-constituents/
// let t: FormulaItem = 's';
// t = 'add';
// console.log(t);
export type FormulaItem = LiteralStringUnion<FormulaOperators>;

export type Formula = Array<FormulaItem>;
export type ParsedFormula = Array<number | FormulaOperators>;

export interface CalculatorState {
	action: Actions;
	formula: Formula;
	error: string | null;
}

export const initialCalculatorState: CalculatorState = {
	action: 'digit',
	formula: ['0'],
	error: null,
};
