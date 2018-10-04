import axios from 'axios';
// import gameResult from '../reducers/game-result';

export function* getGameResult() {
  const response = yield axios.get(
    'http://localhost:8080/result',
  );

  if (response.status === 200) {
    return { getGameResultData: response.data };
  }
  return { error: response.error };
}

// export function* postGameResult() {
//   const response = yield axios.post(
//     'http://localhost:3000/result', {
//       params: { X: 0, O: 0 },
//     },
//   );
//
//   if (response.data.status === 'ok') {
//     return { postGameResultData: response.data };
//   }
//   return { error: response.error };
// }
