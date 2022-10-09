export type BoxData = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export function makeGameField(cols: number, rows: number): BoxData[][] {
  const rowArr: BoxData[][] = [];
  let id = 0;

  for (let r = 0; r < rows; r++) {
    const colArr: BoxData[] = [];

    for (let c = 0; c < cols; c++) {
      const boxData: BoxData = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };

      boxData.top = rowArr[r - 1] && rowArr[r - 1][c] ? rowArr[r - 1][c].bottom : id++;
      boxData.right = id++;
      boxData.bottom = id++;
      boxData.left = colArr[c - 1] ? colArr[c - 1].right : id++;
      colArr.push(boxData);
    }

    rowArr.push(colArr);
  }

  return rowArr;
}

export type ACTIONTYPE =
  | { type: 'init'; payload: { rows: number; cols: number } }
  | { type: 'setLine'; payload: { lineId: number } };

export type STATE = {
  gameField: BoxData[][];
  activeLines: number[];
  playerLines: {
    p1: number[];
    p2: number[];
  };
  currentPlayer: 'p1' | 'p2';
};

export function reducer(state: STATE, action: ACTIONTYPE): STATE {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        gameField: makeGameField(action.payload.rows, action.payload.cols),
      };
    case 'setLine': {
      const { lineId } = action.payload;
      return {
        ...state,
        activeLines: state.activeLines.concat([lineId]),
        playerLines: {
          ...state.playerLines,
          [state.currentPlayer]: [...state.playerLines[state.currentPlayer], lineId],
        },
        currentPlayer: state.currentPlayer === 'p1' ? 'p2' : 'p1',
      };
    }
    default:
      throw new Error('Dispatched unknown state');
  }
}
