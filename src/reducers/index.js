import { combineReducers } from 'redux';
import history from './history';
import stepNumber from './step-number';
import xIsNext from './x-is-next';
import changeList from './change-list';
import gameResult from './game-result';
import winner from './winner';
import setting from './setting';
import testData from './test';

export default combineReducers({
  history,
  stepNumber,
  xIsNext,
  changeList,
  gameResult,
  winner,
  setting,
  testData,
});
