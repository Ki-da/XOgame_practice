const initialState = {
  winner: null,
  x1: null,
  x2: null,
  x3: null,
  y1: null,
  y2: null,
  y3: null,
};

export default (state = initialState, action) => {
  const history = action.history;
  if (action.type === 'JUDGE_GAME') {
    const squares = history[history.length - 1].squares;
    const lines = [
      [
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 1, y: 3 },
      ],
      [
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 2, y: 3 },
      ],
      [
        { x: 3, y: 1 },
        { x: 3, y: 2 },
        { x: 3, y: 3 },
      ],
      [
        { x: 1, y: 1 },
        { x: 2, y: 1 },
        { x: 3, y: 1 },
      ],
      [
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 3, y: 2 },
      ],
      [
        { x: 1, y: 3 },
        { x: 2, y: 3 },
        { x: 3, y: 3 },
      ],
      [
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 3, y: 3 },
      ],
      [
        { x: 3, y: 1 },
        { x: 2, y: 2 },
        { x: 1, y: 3 },
      ],
    ];
    for (let i = 0; i < lines.length; i += 1) {
      const a = lines[i][0].x - 1;
      const b = lines[i][0].y - 1;
      const c = lines[i][1].x - 1;
      const d = lines[i][1].y - 1;
      const e = lines[i][2].x - 1;
      const f = lines[i][2].y - 1;
      if (squares[a][b] && squares[a][b] === squares[c][d] && squares[a][b] === squares[e][f]) {
        return {
          winner: squares[a][b],
          x1: a,
          x2: c,
          x3: e,
          y1: b,
          y2: d,
          y3: f,
        };
      }
    }

    return state;
  }

  if (action.type === 'NEXT_GAME') {
    return initialState;
  }
  return state;
};
