export const getTestData = () => ({
  type: 'GET_TEST_DATA',
});

export const successGetTestData = testData => ({
  type: 'SUCCESS_GET_TEST_DATA',
  testData,
});
