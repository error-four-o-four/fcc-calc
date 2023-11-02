import { type CalculatorState, type OperationActionPayload } from '../types';

import { OPERATIONS } from '../data';

import { valueIsDigit, valueIsOperation } from '../../../assets/utils';

export const handleOperationActionDispatch = (
	prev: CalculatorState,
	payload: OperationActionPayload
): CalculatorState => {
	const { value: operation, isOperation } = payload;

	const [nextToLastEntry, lastEntry] = prev.entries.slice(-2);

	if (!prev.isOperation) {
		const entries =
			// if there are two operators
			lastEntry === OPERATIONS.SUBTRACT && valueIsOperation(nextToLastEntry)
				? // join subtract sign and current value
				  [...prev.entries.slice(0, -1), `-${prev.current}`, operation]
				: // else
				!prev.entries.length || valueIsDigit(nextToLastEntry)
				? // add current value and operator
				  [...prev.entries, prev.current, operation]
				: prev.entries;

		return {
			...prev,
			entries,
			isOperation,
		};
	}

	const entries =
		operation === OPERATIONS.SUBTRACT &&
		(lastEntry === OPERATIONS.MULTIPLY || lastEntry === OPERATIONS.DIVIDE)
			? // add subtract operator as sign
			  [...prev.entries, operation]
			: // else
			lastEntry === OPERATIONS.SUBTRACT && valueIsOperation(prev.entries.at(-2))
			? // replace two operators
			  [...prev.entries.slice(0, -2), operation]
			: // replace one operator
			  [...prev.entries.slice(0, -1), operation];

	return {
		...prev,
		entries,
		isOperation,
	};

	// if (
	//   !prev.wasOperation &&
	//   (!prev.formula.length || isNumber(prev.formula.at(-2)))
	// ) {
	//   return {
	//     ...prev,
	//     formula: [...prev.formula, prev.current, operation],
	//     wasOperation,
	//   };
	// }

	// if (
	//   !prev.wasOperation &&
	//   prevItem === SUBTRACT &&
	//   isOperation(prev.formula.at(-2))
	// ) {
	//   console.log('morp');
	//   return {
	//     ...prev,
	//     formula: [...prev.formula.slice(0, -1), `-${prev.current}`, operation],
	//     wasOperation,
	//   };
	// }

	// if (
	//   operation === SUBTRACT &&
	//   (prevItem === MULTIPLY || prevItem === DIVIDE)
	// ) {
	//   return {
	//     ...prev,
	//     formula: [...prev.formula, operation],
	//     wasOperation,
	//   };
	// }

	// if (
	//   prevItem === SUBTRACT &&
	//   isOperation(prev.formula.at(-2))
	// ) {
	//   return {
	//     ...prev,
	//     formula: [...prev.formula.slice(0, -2), operation],
	//     wasOperation,
	//   };
	// }

	// return {
	//   ...prev,
	//   formula: [...prev.formula.slice(0, -1), operation],
	//   wasOperation,
	// };
};
