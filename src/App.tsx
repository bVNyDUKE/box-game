import './App.css';

const GAME = {
  cols: 10,
  rows: 10,
  boxSize: 80,
  lineWidth: 2,
};

const Box: React.FC<{ col: number; row: number }> = ({ col, row }) => {
  const left = col * (GAME.boxSize - GAME.lineWidth);
  const sideOpacity = col === 0 ? 100 : 0;
  const topOpacity = row > 0 ? 0 : 100;

  return (
    <div className="box" style={{ left }}>
      <div className="side line" style={{ opacity: sideOpacity, zIndex: sideOpacity }} />
      <div className="side line" />
      <div className="top line" style={{ opacity: topOpacity, zIndex: topOpacity }} />
      <div className="bottom line" />
      <div className="circle" style={{ top: '-4px', left: '-4px' }} />
      <div className="circle" style={{ top: '-4px', right: '-4px' }} />
      <div className="circle" style={{ bottom: '-4px', right: '-4px' }} />
      <div className="circle" style={{ bottom: '-4px', left: '-4px' }} />
    </div>
  );
};

const Row: React.FC<{ row: number }> = ({ row, children }) => {
  const width = GAME.boxSize * GAME.cols;
  const top = row * (GAME.boxSize - GAME.lineWidth) + 8;

  return <div style={{ position: 'absolute', width, top }}>{children}</div>;
};

function App() {
  const { boxSize, cols, rows } = GAME;
  const width = boxSize * cols;
  const height = boxSize * cols;

  const rowArr = new Array(rows).fill('');
  const colArr = new Array(cols).fill('');

  return (
    <div className="App">
      <div className="gameArea" style={{ width, height }}>
        {rowArr.map((_, row) => (
          <Row key={row} row={row}>
            {colArr.map((_, col) => (
              <Box key={col} col={col} row={row} />
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}

export default App;
