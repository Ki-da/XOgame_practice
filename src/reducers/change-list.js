export default (state = true, action) => {
  if (action.type === 'SORT_LIST') {
    return !state;
  }
  return state;
};
