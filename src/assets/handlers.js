import { TYPES, ACTIONS } from '../context/stateData.js';

export function handleNumber(value, state, dispatch) {
  // do NOT trigger render
  if (value === '0' && state.current === '0') return;

  if (!state.wasOperation && state.current.length > 11) {
    console.log('limit');
    return;
  }

  // trigger render
  const type = TYPES.NUMBER;
  const wasOperation = false;

  dispatch({ type, payload: { value, wasOperation } });
}

export function handleAction(action, state, dispatch) {
  if (
    action === ACTIONS.CLEAR &&
    state.current === '0' &&
    !state.formula.length
  )
    return;

  if (action === ACTIONS.ERASE && state.current === '0') return;

  if (
    action === ACTIONS.DECIMAL &&
    state.current.includes('.') &&
    !state.wasOperation
  )
    return;

  // trigger render
  dispatch({ type: action, payload: { wasOperation: false } });
}

export function handleOperation(operation, state, dispatch) {
  dispatch({
    type: TYPES.OPERATION,
    payload: { operation, wasOperation: true },
  });
}
