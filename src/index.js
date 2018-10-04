import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import testDataSaga from './sagas/test-saga';
import gameResultSaga from './sagas/game-result-saga';
import FunctionalGame from './App';
import SettingForm from './setting-form';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/index';


const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));


sagaMiddleware.run(testDataSaga);
sagaMiddleware.run(gameResultSaga);


const Header = () => (
  <div>
    <p>Header</p>
    <ul>
      <li><Link to="/">Setting</Link></li>
      <li><Link to="/game">Game</Link></li>
    </ul>
  </div>
);

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={SettingForm} />
        <Route path="/game" component={FunctionalGame} />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
