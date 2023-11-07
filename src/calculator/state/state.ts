import type { LiteralStringUnion } from '../../utils/types.ts';
import type { ArithmeticOperators } from '../config.ts';

// import type { ArithmeticOperators, Operators } from '../config.ts';

// use LiteralStringUnion to disable https://typescript-eslint.io/rules/no-redundant-type-constituents/
// let t: FormulaItem = 's';
// t = 'add';
// console.log(t);

// export type OperatorsInFormula = Readonly<
// 	Extract<Operators, ArithmeticOperators | 'lpar' | 'rpar'> | 'negate'
// >;

export type OperatorsInFormula = ArithmeticOperators;

export type Formula = Array<FormulaItem>;
export type FormulaItem = LiteralStringUnion<OperatorsInFormula>;

export type ParsedFormula = Array<ParsedFormulaItem>;
export type ParsedFormulaItem = number | OperatorsInFormula;

export interface CalculatorState {
	formula: Formula;
	result: string | null;
	error: string | null;
}

export const initialCalculatorState: CalculatorState = {
	formula: ['0'],
	result: null,
	error: null,
};
