export const jumpToPastStep = step => ({
  type: 'JUMP_TO_PAST_STEP',
  step,
});

export const getCurrentStep = history => ({
  type: 'GET_CURRENT_STEP',
  history,
});
