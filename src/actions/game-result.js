export const result = winner => ({
  type: 'RESULT',
  winner: winner.winner,
});

export const getGameResult = () => ({
  type: 'GET_GAME_RESULT',
});

// export const postGameResult = () => ({
//   type: 'POST_GAME_RESULT',
// });

export const successGetGameResult = getGameResultData => ({
  type: 'SUCCESS_GET_GAME_RESULT',
  getGameResultData,
});
