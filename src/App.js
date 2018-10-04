import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { clickSquare, nextGame } from './actions/history';
import sortList from './actions/change-list';
import judgeGame from './actions/winner';
import { getCurrentStep, jumpToPastStep } from './actions/step-number';
import { nextPlayer, xPlayFirst } from './actions/x-is-next';
import { /* postGameResult */ result, getGameResult } from './actions/game-result';
import { getTestData } from './actions/test';


const highlightSquare = (x, y, winner) => (
  (((x === winner.x1 && y === winner.y1)
  || (x === winner.x2 && y === winner.y2)
  || (x === winner.x3 && y === winner.y3))) ? 'red' : ''
);

const canClickSquare = (winner, stepNumber, latestSquare, history, setting) => {
  if (winner.winner || latestSquare) {
    if (setting.mode) {
      return true;
    }
    if (latestSquare === 'O' && history[stepNumber - 1].interferenceToO) {
      return false;
    }
    return !(latestSquare === 'X' && history[stepNumber - 1].interferenceToX);
  }
  return false;
};


const FunctionalSquare = ({
  history, xIsNext, stepNumber, x, y, latestSquare, winner, clickSquare, value, setting,
}) => (
  (
    <button
      className="square"
      style={{
        color: highlightSquare(x, y, winner),
      }}
      onClick={() => (canClickSquare(winner, stepNumber, latestSquare, history, setting)
        ? null : clickSquare(x, y, history, xIsNext, stepNumber))
      }
    >
      {value}
    </button>
  )
);

const status = (winner, xIsNext) => {
  if (winner.winner) {
    return `Winner: ${winner.winner}`;
  }
  return `Next player: ${xIsNext ? 'X' : 'O'}`;
};

const FunctionalBoard = ({
  squares, history, xIsNext, stepNumber, latestSquares, clickSquare, winner, setting,
}) => (
  <div>
    <h2>{`Title : ${setting.title}`}</h2>
    <div className="status">{status(winner, xIsNext)}</div>
    {squares ? squares.map((v1, k1) => (
      <div className="board-row">
        {squares.map((v2, k2) => (
          <FunctionalSquare
            value={squares[k2][k1]}
            x={k2}
            y={k1}
            winner={winner}
            history={history}
            xIsNext={xIsNext}
            stepNumber={stepNumber}
            squares={squares}
            latestSquare={latestSquares.squares[k2][k1]}
            clickSquare={clickSquare}
            setting={setting}
          />))}
      </div>
    )) : null}
  </div>
);

const FunctionalGame = ({
  clickSquare, jumpToPastStep, history, stepNumber, xIsNext, changeList,
  sortList, nextGame, gameResult, winner, setting, modeChange, setTitle, testData,
}) => (
  <div className="game">
    <div className="game-board">
      <h1>
        {testData[0] ? testData[0].name : 'null'}
      </h1>
      <FunctionalBoard
        squares={history[stepNumber] && history[stepNumber].squares
          ? history[stepNumber].squares : null}
        winner={winner}
        latestSquares={history[history.length - 1]}
        history={history}
        xIsNext={xIsNext}
        stepNumber={stepNumber}
        clickSquare={clickSquare}
        setting={setting}
      />
    </div>
    <div className="game-info">
      <div>
        <h3>{`Mode : ${setting.mode ? 'Normal' : 'Shit'}`}</h3>
      </div>
      <ol>
        <li>
          <a href="#" onClick={() => jumpToPastStep(0)} style={stepNumber === 0 ? { fontWeight: 600 } : {}}>Game start</a>
        </li>
        {changeList
          ? history.map((step, move) => {
            if (move === 0) {
              return null;
            }
            return (
              <li value={move + 1}>
                <a href="#" onClick={() => jumpToPastStep(move)} style={move === stepNumber ? { fontWeight: 600 } : {}}>
                  {`Move #${move}`}
                </a>
              </li>
            );
          }) : history.map((step, move) => {
            if (move === 0) {
              return null;
            }
            return (
              <li value={move + 1}>
                <a href="#" onClick={() => jumpToPastStep(move)} style={move === stepNumber ? { fontWeight: 600 } : {}}>
                  {`Move #${move}`}
                </a>
              </li>
            );
          }).slice().reverse()}
      </ol>
      <button className="list-sort" onClick={sortList}>
                    Sort
      </button>
      <button
        className="next-game"
        onClick={() => (winner.winner ? nextGame() : false)}
      >
                    Next
      </button>
      <div className="game-result">
        <p>{`X : ${gameResult.X} wins`}</p>
        <p>{`O : ${gameResult.O} wins`}</p>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  history: state.history,
  stepNumber: state.stepNumber,
  xIsNext: state.xIsNext,
  changeList: state.changeList,
  gameResult: state.gameResult,
  winner: state.winner,
  setting: state.setting,
  testData: state.testData,
});

const mapDispatchToProps = dispatch => ({
  clickSquare:
      (x, y, history, xIsNext, stepNumber) => dispatch(
        clickSquare(x, y, history, xIsNext, stepNumber),
      ),
  jumpToPastStep: step => dispatch(jumpToPastStep(step)),
  sortList: () => dispatch(sortList()),
  nextGame: () => dispatch(nextGame()),
  judgeGame: history => dispatch(judgeGame(history)),
  getCurrentStep: history => dispatch(getCurrentStep(history)),
  nextPlayer: () => dispatch(nextPlayer()),
  xPlayFirst: () => dispatch(xPlayFirst()),
  result: winner => dispatch(result(winner)),
  getTestData: () => dispatch(getTestData()),
  getGameResult: () => dispatch(getGameResult()),
  // postGameResult: () => dispatch(postGameResult()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      console.log('mounted!');
      this.props.getTestData();
    },

    componentWillMount() {
      console.log('will mount!');
    },

    componentWillUpdate(nextProps) {
      if (JSON.stringify(nextProps.history) !== JSON.stringify(this.props.history)) {
        this.props.getCurrentStep(nextProps.history);
      }

      if (JSON.stringify(nextProps.history) !== JSON.stringify(this.props.history)) {
        this.props.judgeGame(nextProps.history);
      }
    },

    componentDidUpdate(prevProps) {
      if (JSON.stringify(prevProps.history) !== JSON.stringify(this.props.history)) {
        this.props.nextPlayer();
      }

      if (JSON.stringify(prevProps.winner) !== JSON.stringify(this.props.winner)) {
        this.props.result(this.props.winner);
        // this.props.postGameResult();
        this.props.getGameResult();
      }

      if (this.props.history.length === 1 && this.props.xIsNext === false) {
        this.props.xPlayFirst();
      }
    },
  }),
)(FunctionalGame);
