export const clickSquare = (x, y, history, xIsNext, stepNumber) => ({
  type: 'CLICK_SQUARE',
  x,
  y,
  history,
  xIsNext,
  stepNumber,
});

export const nextGame = () => ({
  type: 'NEXT_GAME',
});
