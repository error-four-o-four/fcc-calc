import { useEffect, useState } from 'react';

import buttons from './assets/buttons.js';

import { OPERATIONS, isOperation, isNumber } from './assets/utils.js';
import { handleNumberInput, handleOperatorInput } from './assets/handlers.js';
import { formatFormula } from './assets/formatters.js';

export default function App() {
  const [formula, setFormula] = useState([]);
  const [current, setCurrent] = useState('0');
  const [hasFraction, setHasFraction] = useState(false);

  const operationHandler = {
    clear() {
      setFormula([]);
      setCurrent('0');
    },
    erase() {
      if (current.length === 1) return;

      if (current.at(-1) === '.') setHasFraction(false);

      setCurrent((prev) => prev.substring(0, prev.length - 1));
    },
    decimal() {
      if (hasFraction) return;

      setCurrent((prev) => `${prev}.`);
      setHasFraction(true);
    },
    push(operation) {
      if (!formula.length) {
        setFormula(() => [current, operation]);
        return;
      }

      const previousOperation = formula.at(-1);

      if (
        operation === 'subtract' &&
        (previousOperation === 'multiply' || previousOperation === 'divide')
      ) {
        setFormula((prev) => [...prev, operation]);
        return;
      }

      if (previousOperation === 'subtract' && isOperation(formula.at(-2))) {
        setFormula((prev) => [...prev.slice(0, -2), operation]);
        return;
      }

      setFormula((prev) => [...prev.slice(0, -1), operation]);
    },
  };

  const handleClick = (e) => {
    const clickedNumber = e.target.name === 'number';

    if (clickedNumber) {
      handleNumberInput(e, current, setCurrent);
      return;
    }

    handleOperatorInput(e, operationHandler);
  };

  useEffect(() => {
    console.log(current, hasFraction);
  });

  return (
    <div className="App">
      <div id="formula">{formatFormula(formula)}</div>
      <div id="display">{current}</div>
      <div id="buttons">
        {buttons.map(({ id, text, type }) => (
          <button
            key={id}
            id={id}
            className={`btn-${type}`}
            value={text}
            name={type}
            type="button"
            onClick={handleClick}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
