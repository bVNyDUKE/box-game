import { useEffect, useMemo, useReducer } from 'react';
import './App.css';
import { BoxData, ACTIONTYPE, reducer, STATE } from './state';

const BOXSIZE = 80;
const LINEWIDTH = 10;

const Box: React.FC<{
  col: number;
  data: BoxData;
  dispatch: React.Dispatch<ACTIONTYPE>;
  activeLines: STATE['activeLines'];
  playerLines: STATE['playerLines'];
}> = ({ col, data, dispatch, activeLines, playerLines }) => {
  const left = col * (BOXSIZE - LINEWIDTH);

  const boxActiveLines = activeLines.filter((id: number) =>
    Object.values(data).includes(id),
  );

  const lineActive = (lineId: number) => boxActiveLines.includes(lineId);

  const boxWonBy = useMemo(() => {
    const p1 =
      playerLines.p1.filter((id: number) => Object.values(data).includes(id)).length ===
      4;
    const p2 =
      playerLines.p2.filter((id: number) => Object.values(data).includes(id)).length ===
      4;

    if (p1) {
      return 'p1';
    }

    if (p2) {
      return 'p2';
    }

    return '';
  }, [playerLines]);

  const playerClass = (lineId: number) => {
    if (lineActive(lineId)) {
      return playerLines.p1.includes(lineId) ? 'p1' : 'p2';
    }
    return 'line';
  };

  const handleLineClick = (lineId: number) => {
    if (boxActiveLines.includes(lineId)) {
      return;
    }
    dispatch({ type: 'setLine', payload: { lineId } });
  };

  return (
    <div className={`box ${boxWonBy}`} style={{ left }}>
      <div
        className={`side ${playerClass(data.left)}`}
        onClick={() => handleLineClick(data.left)}
      />
      <div
        className={`side ${playerClass(data.right)}`}
        onClick={() => handleLineClick(data.right)}
      />
      <div
        className={`top ${playerClass(data.top)}`}
        onClick={() => handleLineClick(data.top)}
      />
      <div
        className={`bottom ${playerClass(data.bottom)}`}
        onClick={() => handleLineClick(data.bottom)}
      />

      {boxWonBy === '' && (
        <>
          <div className="circle top-left" />
          <div className="circle top-right" />
          <div className="circle bottom-left" />
          <div className="circle bottom-right" />
        </>
      )}
    </div>
  );
};

const Row: React.FC<{ row: number; cols: number }> = ({ row, cols, children }) => {
  const width = BOXSIZE * cols;
  const top = row * (BOXSIZE - LINEWIDTH) + 8;

  return <div style={{ position: 'absolute', width, top }}>{children}</div>;
};

function App() {
  const cols = 10;
  const rows = 10;

  const width = BOXSIZE * cols;
  const height = BOXSIZE * cols;

  const initialState: STATE = {
    gameField: [],
    activeLines: [],
    playerLines: {
      p1: [],
      p2: [],
    },
    currentPlayer: 'p1',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => dispatch({ type: 'init', payload: { rows, cols } }), []);

  return (
    <div className="App">
      <div className="gameArea" style={{ width, height }}>
        {state.gameField.map((col, rowIndex) => (
          <Row key={rowIndex} row={rowIndex} cols={cols}>
            {col.map((boxData, colIndex) => (
              <Box
                key={colIndex}
                data={boxData}
                col={colIndex}
                dispatch={dispatch}
                activeLines={state.activeLines}
                playerLines={state.playerLines}
              />
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}

export default App;
