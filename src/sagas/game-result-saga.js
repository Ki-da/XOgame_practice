import { call, put, takeEvery } from 'redux-saga/effects';
import { getGameResult /* postGameResult */ } from '../api/game-result';
import { successGetGameResult } from '../actions/game-result';


function* fetchGetGameResult() {
  try {
    const { getGameResultData, error } = yield call(getGameResult);
    if (getGameResultData) {
      yield put(successGetGameResult(getGameResultData));
    }
    if (error) {
      alert(error);
    }
  } catch (e) {
    alert(e);
  }
}

// function* fetchPostGameResult() {
//   try {
//     const { error } = yield call(postGameResult);
//     if (error) {
//       alert(error);
//     }
//   } catch (e) {
//     alert(e);
//   }
// }

export default function* gameResultTimeStampSag() {
  yield takeEvery('GET_GAME_RESULT', fetchGetGameResult);
  // yield takeEvery('POST_GAME_RESULT', fetchPostGameResult);
}
