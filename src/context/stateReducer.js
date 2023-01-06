import { TYPES, OPERATIONS, ACTIONS } from './stateData.js';
import { isNumber, isOperation } from '../assets/utils.js';

import calculate from '../assets/calculator.js';

const { NUMBER, OPERATION } = TYPES;
const { SUBTRACT, MULTIPLY, DIVIDE } = OPERATIONS;
const { CLEAR, ERASE, DECIMAL, EQUALS } = ACTIONS;

export const initialCalculatorState = {
  formula: [],
  current: '0',
  wasOperation: false,
};

const actionHandler = {
  [OPERATION](prev, { operation, wasOperation }) {
    const prevItem = prev.formula.at(-1);

    if (!prev.wasOperation) {
      const formula =
        // if there are two operators
        prevItem === SUBTRACT && isOperation(prev.formula.at(-2))
          ? // join subtract sign and current value
            [...prev.formula.slice(0, -1), `-${prev.current}`, operation]
          : // else
          !prev.formula.length || isNumber(prev.formula.at(-2))
          ? // add current value and operator
            [...prev.formula, prev.current, operation]
          : prev.formula;

      return {
        ...prev,
        formula,
        wasOperation,
      };
    }

    const formula =
      operation === SUBTRACT && (prevItem === MULTIPLY || prevItem === DIVIDE)
        ? // add subtract operator as sign
          [...prev.formula, operation]
        : // else
        prevItem === SUBTRACT && isOperation(prev.formula.at(-2))
        ? // replace two operators
          [...prev.formula.slice(0, -2), operation]
        : // replace one operator
          [...prev.formula.slice(0, -1), operation];

    return {
      ...prev,
      formula,
      wasOperation,
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
  },
  [CLEAR]() {
    return initialCalculatorState;
  },
  [ERASE](prev, { wasOperation }) {
    // set to zero
    if (prev.current.length === 1 && prev.current !== '0') {
      return {
        ...prev,
        current: '0',
        wasOperation,
      };
    }

    // erase last digit
    const current = prev.current.substring(0, prev.current.length - 1);

    return {
      ...prev,
      current,
      wasOperation,
    };
  },
  [DECIMAL](prev, { wasOperation }) {
    return {
      ...prev,
      current: prev.wasOperation ? `0.` : `${prev.current}.`,
      wasOperation,
    };
  },
  [EQUALS](prev, { wasOperation }) {
    const formula = [...prev.formula];

    if (prev.wasOperation) {
      formula.pop();
    }

    if (
      formula.at(-1) === SUBTRACT &&
      (formula.at(-2) === MULTIPLY || formula.at(-2) === DIVIDE)
    ) {
      formula.pop();
      formula.push(`-${prev.current}`);
    } else {
      formula.push(prev.current);
    }

    const result = `${calculate(formula)}`;

    return {
      formula: [],
      current: result,
      wasOperation,
    };
  },
  [NUMBER](prev, { value, wasOperation }) {
    const current =
      prev.current === '0' || prev.wasOperation ? value : prev.current + value;

    return {
      ...prev,
      current,
      wasOperation,
    };
  },
};

export function stateReducer(state, action) {
  const { type, payload } = action;
  return actionHandler[type](state, payload);
}
