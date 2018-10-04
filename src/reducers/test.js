export default (state = '', action) => {
  if (action.type === 'SUCCESS_GET_TEST_DATA') {
    return action.testData;
  }
  return state;
};
