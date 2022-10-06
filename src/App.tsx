import { useRef, useState } from 'react';
import './App.css';

type Pos = {
  x: number;
  y: number;
};

function App() {
  const [posOne, setPos] = useState<Pos>();
  const [posTwo, setPosTwo] = useState<Pos>();
  const [dragging, setDragging] = useState(false);
  const gameArea = useRef<SVGSVGElement>(null);

  const setPosition = (e: React.MouseEvent<SVGCircleElement, MouseEvent>) => {
    const x = e.currentTarget.cx.baseVal.value;
    const y = e.currentTarget.cy.baseVal.value;
    setPos({ x, y });
  };

  const updateMousePos = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!dragging) {
      return;
    }

    const area = gameArea.current;
    if (!area) {
      return;
    }

    const bound = area.getBoundingClientRect();

    setPosTwo({
      x: e.clientX - bound.left - area.clientLeft,
      y: e.clientY - bound.top - area.clientTop,
    });
  };

  return (
    <div className="App">
      <div className="gameArea">
        <svg
          ref={gameArea}
          viewBox={['0', '0', 450, 400].join(' ')}
          width="450"
          height="400"
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseMove={updateMousePos}
        >
          <circle cx="150" cy="100" r="20" fill="white" onClick={setPosition} />
          <circle cx="200" cy="200" r="20" fill="white" onClick={setPosition} />
          <line
            x1={posOne?.x || 50}
            x2={posTwo?.x || 0}
            y1={posOne?.y || 110}
            y2={posTwo?.y || 0}
            stroke="white"
            strokeWidth="6"
          />
        </svg>
      </div>
    </div>
  );
}

export default App;
