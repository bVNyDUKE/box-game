import { makeGameField } from './App';
import { it, expect } from 'vitest';

it('generates valid 2x2 initial state', () => {
  const rowArr = makeGameField(2, 2);

  expect(rowArr.length).toBe(2);
  expect(rowArr[0].length).toBe(2);
  expect(rowArr[1].length).toBe(2);

  expect(rowArr[0][0]).toEqual({
    activeLines: 0,
    lastPlayer: null,
    top: { id: 0, player: null },
    right: { id: 1, player: null },
    bottom: { id: 2, player: null },
    left: { id: 3, player: null },
  });
  expect(rowArr[0][1]).toEqual({
    activeLines: 0,
    lastPlayer: null,
    top: { id: 4, player: null },
    right: { id: 5, player: null },
    bottom: { id: 6, player: null },
    left: { id: 1, player: null },
  });
  expect(rowArr[1][0]).toEqual({
    activeLines: 0,
    lastPlayer: null,
    top: { id: 2, player: null },
    right: { id: 7, player: null },
    bottom: { id: 8, player: null },
    left: { id: 9, player: null },
  });
  expect(rowArr[1][1]).toEqual({
    activeLines: 0,
    lastPlayer: null,
    top: { id: 6, player: null },
    right: { id: 10, player: null },
    bottom: { id: 11, player: null },
    left: { id: 7, player: null },
  });
});

it('generates valid 3x3 initial state', () => {
  const rowArr = makeGameField(3, 3);

  expect(rowArr.length).toBe(3);
  expect(rowArr[0].length).toBe(3);
  expect(rowArr[2].length).toBe(3);

  expect(rowArr[0][0]).toEqual({
    activeLines: 0,
    lastPlayer: null,
    top: { id: 0, player: null },
    right: { id: 1, player: null },
    bottom: { id: 2, player: null },
    left: { id: 3, player: null },
  });
  expect(rowArr[0][1]).toEqual({
    activeLines: 0,
    lastPlayer: null,
    top: { id: 4, player: null },
    right: { id: 5, player: null },
    bottom: { id: 6, player: null },
    left: { id: 1, player: null },
  });
  expect(rowArr[0][2]).toEqual({
    activeLines: 0,
    lastPlayer: null,
    top: { id: 7, player: null },
    right: { id: 8, player: null },
    bottom: { id: 9, player: null },
    left: { id: 5, player: null },
  });
  expect(rowArr[1][0]).toEqual({
    activeLines: 0,
    lastPlayer: null,
    top: { id: 2, player: null },
    right: { id: 10, player: null },
    bottom: { id: 11, player: null },
    left: { id: 12, player: null },
  });
  expect(rowArr[2][2]).toEqual({
    activeLines: 0,
    lastPlayer: null,
    top: { id: 16, player: null },
    right: { id: 22, player: null },
    bottom: { id: 23, player: null },
    left: { id: 20, player: null },
  });
});
