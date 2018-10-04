export default (state = 0, action) => {
  if (action.type === 'JUMP_TO_PAST_STEP') {
    return action.step;
  }

  if (action.type === 'GET_CURRENT_STEP') {
    return action.history.length - 1;
  }

  return state;
};
