const initialState = [{
  squares: [Array(3).fill(null), Array(3).fill(null), Array(3).fill(null)],
  interferenceToO: true,
  interferenceToX: true,
}];

export default (state = initialState, action) => {
  if (action.type === 'CLICK_SQUARE') {
    const current = state[state.length - 1];
    const squares = JSON.parse(JSON.stringify(current.squares));
    if (squares[action.x][action.y] === 'O' && current.interferenceToO) {
      squares[action.x][action.y] = action.xIsNext ? 'X' : 'O';
      return state.concat([{
        squares,
        interferenceToO: false,
        interferenceToX: current.interferenceToX,
      }]);
    }

    if (squares[action.x][action.y] === 'X' && current.interferenceToX) {
      squares[action.x][action.y] = action.xIsNext ? 'X' : 'O';
      return state.concat([{
        squares,
        interferenceToO: current.interferenceToO,
        interferenceToX: false,
      }]);
    }
    squares[action.x][action.y] = action.xIsNext ? 'X' : 'O';
    return state.concat([{
      squares,
      interferenceToO: current.interferenceToO,
      interferenceToX: current.interferenceToX,
    }]);
  }

  if (action.type === 'NEXT_GAME') {
    return initialState;
  }

  return state;
};
