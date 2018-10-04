import axios from 'axios';

// axios.defaults.baseURL = 'http://192.168.99.100:3000/';
// axios.defaults.baseURL = 'http://localhost:3000/';

export default function* getTestData() {
  const response = yield axios.get(
    'https://jsondata.okiba.me/v1/json/qFMyR180925123833',
  );

  if (response.status === 200) {
    return { testData: response.data };
  }
  return { error: response.error };
}
