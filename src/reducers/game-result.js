export default (state = { X: 0, O: 0 }, action) => {
  if (action.type === 'RESULT' && action.winner) {
    if (action.winner === 'X') {
      const increasedNumber = state.X + 1;
      return { X: increasedNumber, O: state.O };
    }

    if (action.winner === 'O') {
      const increasedNumber = state.O + 1;
      return { X: state.X, O: increasedNumber };
    }
    return state;
  }

  if (action.type === 'SUCCESS_GET_GAME_RESULT') {
    return action.getGameResultData;
  }

  return state;
};
