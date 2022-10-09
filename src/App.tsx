import './App.css';
import { BoxData, makeInitialState } from './state';

const BOXSIZE = 80;
const LINEWIDTH = 2;

const Box: React.FC<{ col: number; row: number; data: BoxData }> = ({
  col,
  row,
  data,
}) => {
  const left = col * (BOXSIZE - LINEWIDTH);
  const sideOpacity = col === 0 ? 100 : 0;
  const topOpacity = row > 0 ? 0 : 100;

  return (
    <div className="box" style={{ left }}>
      <div
        className="side line"
        style={{ opacity: sideOpacity, zIndex: sideOpacity }}
        onClick={() => console.log(data.left)}
      />
      <div className="side line" onClick={() => console.log(data.right)} />
      <div className="top line" style={{ opacity: topOpacity, zIndex: topOpacity }} />
      <div className="bottom line" />
      <div className="circle" style={{ top: '-4px', left: '-4px' }} />
      <div className="circle" style={{ top: '-4px', right: '-4px' }} />
      <div className="circle" style={{ bottom: '-4px', right: '-4px' }} />
      <div className="circle" style={{ bottom: '-4px', left: '-4px' }} />
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
  const rowArr = makeInitialState(cols, rows);

  return (
    <div className="App">
      <div className="gameArea" style={{ width, height }}>
        {rowArr.map((col, rowIndex) => (
          <Row key={rowIndex} row={rowIndex} cols={cols}>
            {col.map((boxData, colIndex) => (
              <Box key={colIndex} data={boxData} col={colIndex} row={rowIndex} />
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}

export default App;
