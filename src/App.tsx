import './App.css';

const GAME = {
  cols: new Array(5).fill(''),
  rows: new Array(5).fill(''),
  boxSize: 80,
};

const Box: React.FC<{ col: number; row: number }> = ({ col, row }) => {
  const left = col * (GAME.boxSize - 5);
  const sideOpacity = col === 0 ? 100 : 0;
  const topOpacity = row > 0 ? 0 : 100;

  return (
    <div className="box" style={{ left }}>
      <div className="side line" style={{ opacity: sideOpacity, zIndex: sideOpacity }} />
      <div className="side line" />
      <div className="top line" style={{ opacity: topOpacity, zIndex: topOpacity }} />
      <div className="bottom line" />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <div className="gameArea">
        {GAME.rows.map((_, row) => (
          <div
            key={row}
            className="gameRow"
            style={{ width: GAME.boxSize * 5, top: row * (GAME.boxSize - 5) + 8 }}
          >
            {GAME.cols.map((_, col) => (
              <Box key={col} col={col} row={row} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
