import { call, put, takeEvery } from 'redux-saga/effects';
import getTestData from '../api/test';
import { successGetTestData } from '../actions/test';


function* fetchTestData() {
  try {
    const { testData, error } = yield call(getTestData);
    if (testData) {
      yield put(successGetTestData(testData));
    }
    if (error) {
      alert(error);
    }
  } catch (e) {
    alert(e);
  }
}


export default function* interruptedTimeStampSaga() {
  yield takeEvery('GET_TEST_DATA', fetchTestData);
}
