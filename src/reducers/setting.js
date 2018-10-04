const initialState = {
  title: 'クソゲー',
  mode: true,
};

export default (state = initialState, action) => {
  if (action.type === 'MODE_CHANGE') {
    return {
      title: state.title,
      mode: !state.mode,
    };
  }

  if (action.type === 'SET_TITLE') {
    return {
      title: action.title,
      mode: state.mode,
    };
  }

  return state;
};
