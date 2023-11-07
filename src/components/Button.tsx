import { useContext } from 'react';

import type {
	Digits,
	ArithmeticOperators,
	FunctionalOperators,
} from '../calculator/config.ts';

import type { Actions } from '../calculator/state/actions.ts';

import { CalculatorDispatchContext } from '../calculator/state/context.tsx';

import { DIGITS, OPERATORS } from '../calculator/config.ts';

type DigitButtonProps = {
	digit: Digits;
	operator?: never;
	functional?: never;
};

type OperatorButtonProps = {
	digit?: never;
	operator: ArithmeticOperators;
	functional?: never;
};

type FunctionalButtonProps = {
	digit?: never;
	operator?: never;
	functional: FunctionalOperators;
};

type TypedButtonProps<T extends Actions> = T extends 'digit'
	? DigitButtonProps
	: T extends 'operator'
	? OperatorButtonProps
	: T extends 'functional'
	? FunctionalButtonProps
	: never;

const getValues = (props: TypedButtonProps<Actions>) => {
	const type: Actions =
		'digit' in props
			? 'digit'
			: 'operator' in props
			? 'operator'
			: 'functional';

	if (type === 'digit') {
		const { digit } = props as TypedButtonProps<typeof type>;
		const value = DIGITS[digit];
		return {
			id: digit,
			type,
			value,
			icon: value,
		};
	}

	if (type === 'operator') {
		const { operator } = props as TypedButtonProps<typeof type>;
		return {
			id: operator,
			type,
			value: operator,
			icon: OPERATORS[operator],
		};
	}

	const { functional } = props as TypedButtonProps<typeof type>;
	return {
		id: functional,
		type,
		value: functional,
		icon: OPERATORS[functional],
	};
};

function Button(props: DigitButtonProps): React.JSX.Element;
function Button(props: OperatorButtonProps): React.JSX.Element;
function Button(props: FunctionalButtonProps): React.JSX.Element;
function Button(
	props: DigitButtonProps | OperatorButtonProps | FunctionalButtonProps
) {
	const dispatch = useContext(CalculatorDispatchContext);

	const { id, type, value, icon } = getValues(props);

	const handleClick = () => {
		dispatch({
			type,
			payload: {
				value,
			},
		});
	};

	return (
		<button
			id={id}
			className={`btn-calculator btn-${type}`}
			type="button"
			value={value}
			onClick={handleClick}>
			{icon}
		</button>
	);
}

export default Button;
