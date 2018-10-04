export default (state = true, action) => {
  if (action.type === 'NEXT_PLAYER') {
    return !state;
  }

  if (action.type === 'X_PLAY_FIRST') {
    return true;
  }
  return state;
};
