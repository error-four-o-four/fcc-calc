import { type CalculatorState, type DigitActionPayload } from '../types';

export const handleDigitActionDispatch = (
	prev: CalculatorState,
	payload: DigitActionPayload
): CalculatorState => {
	const { value, isOperation } = payload;
	const current =
		prev.current === '0' || prev.isOperation ? value : prev.current + value;

	return {
		...prev,
		current,
		isOperation,
	};
};
