import { useMemo, useRef, useState } from 'react';
import './App.css';

const BOXSIZE = 80;
const LINEWIDTH = 10;

type Players = 'p1' | 'p2' | null;

type Line = {
  id: number;
  player: Players;
};

type BoxData = {
  top: Line;
  right: Line;
  bottom: Line;
  left: Line;
  activeLines: number;
  lastPlayer: Players;
};

function makeGameField(cols: number, rows: number): BoxData[][] {
  const rowArr: BoxData[][] = [];
  let id = 0;

  for (let row = 0; row < rows; row++) {
    const colArr: BoxData[] = [];

    for (let col = 0; col < cols; col++) {
      const boxData: BoxData = {
        top:
          rowArr[row - 1] && rowArr[row - 1][col]
            ? rowArr[row - 1][col].bottom
            : { id: id++, player: null },
        right: { id: id++, player: null },
        bottom: { id: id++, player: null },
        left: colArr[col - 1] ? colArr[col - 1].right : { id: id++, player: null },
        activeLines: 0,
        lastPlayer: null,
      };

      colArr.push(boxData);
    }

    rowArr.push(colArr);
  }

  return rowArr;
}

const Box: React.FC<{
  col: number;
  boxLines: BoxData;
  handleLineClick: (line: Line) => void;
}> = ({ col, boxLines, handleLineClick }) => {
  const boxWonBy = useMemo(
    () => (boxLines.activeLines === 4 ? boxLines.lastPlayer : ''),
    [boxLines],
  );

  const playerClass = (line: Line) => {
    return boxWonBy !== '' ? boxWonBy : line.player || 'line';
  };

  const onLineClick = (line: Line) => {
    if (line.player) {
      return;
    }
    handleLineClick(line);
  };

  const left = col * (BOXSIZE - LINEWIDTH);
  return (
    <div className={`box ${boxWonBy}`} style={{ left }}>
      <div
        className={`side ${playerClass(boxLines.left)}`}
        onClick={() => onLineClick(boxLines.left)}
      />
      <div
        className={`side ${playerClass(boxLines.right)}`}
        onClick={() => onLineClick(boxLines.right)}
      />
      <div
        className={`top ${playerClass(boxLines.top)}`}
        onClick={() => onLineClick(boxLines.top)}
      />
      <div
        className={`bottom ${playerClass(boxLines.bottom)}`}
        onClick={() => onLineClick(boxLines.bottom)}
      />

      {boxWonBy === '' ? (
        <>
          <div className="circle top-left" />
          <div className="circle top-right" />
          <div className="circle bottom-left" />
          <div className="circle bottom-right" />
        </>
      ) : null}
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

  const [gameField, setGameField] = useState(makeGameField(cols, rows));
  const [currentPlayer, setCurrentPlayer] = useState<'p1' | 'p2'>('p1');
  const [points, setPoints] = useState<{ p1: number; p2: number }>({ p1: 0, p2: 0 });
  const boxWon = useRef(false);

  const directions = ['top', 'right', 'bottom', 'left'] as const;
  const handleLineClick = (line: Line) => {
    setGameField((prev) => {
      return prev.map((row) =>
        row.map((box) => {
          let newBox = box;
          directions.forEach((dir) => {
            if (box[dir].id === line.id) {
              newBox = {
                ...box,
                [dir]: { ...box[dir], player: currentPlayer },
                activeLines: box.activeLines + 1,
                lastPlayer: currentPlayer,
              };
              if (newBox.activeLines === 4) {
                boxWon.current = true;
              }
            }
          });
          return newBox;
        }),
      );
    });

    if (boxWon.current) {
      setPoints((prev) => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }));
      boxWon.current = false;
      return;
    }
    setCurrentPlayer((prev) => (prev === 'p1' ? 'p2' : 'p1'));
  };

  return (
    <div className="App">
      <div className="scoreBoard">
        Player 1: {points.p1} - {points.p2} : Player 2
      </div>
      <div className="gameArea" style={{ width, height }}>
        {gameField.map((col, rowIndex) => (
          <Row key={rowIndex} row={rowIndex} cols={cols}>
            {col.map((boxData, colIndex) => (
              <Box
                key={colIndex}
                boxLines={boxData}
                col={colIndex}
                handleLineClick={handleLineClick}
              />
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}

export default App;
