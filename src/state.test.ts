import { makeInitialState } from './state';
import { it, expect } from 'vitest';

it('generates valid 2x2 initial state', () => {
  const rowArr = makeInitialState(2, 2);

  expect(rowArr.length).toBe(2);
  expect(rowArr[0].length).toBe(2);
  expect(rowArr[1].length).toBe(2);

  expect(rowArr[0][0]).toEqual({
    top: 0,
    right: 1,
    bottom: 2,
    left: 3,
  });
  expect(rowArr[0][1]).toEqual({
    top: 4,
    right: 5,
    bottom: 6,
    left: 1,
  });
  expect(rowArr[1][0]).toEqual({
    top: 2,
    right: 7,
    bottom: 8,
    left: 9,
  });
  expect(rowArr[1][1]).toEqual({
    top: 6,
    right: 10,
    bottom: 11,
    left: 7,
  });
});

it('generates valid 3x3 initial state', () => {
  const rowArr = makeInitialState(3, 3);

  expect(rowArr.length).toBe(3);
  expect(rowArr[0].length).toBe(3);
  expect(rowArr[2].length).toBe(3);

  expect(rowArr[0][0]).toEqual({
    top: 0,
    right: 1,
    bottom: 2,
    left: 3,
  });
  expect(rowArr[0][1]).toEqual({
    top: 4,
    right: 5,
    bottom: 6,
    left: 1,
  });
  expect(rowArr[0][2]).toEqual({
    top: 7,
    right: 8,
    bottom: 9,
    left: 5,
  });
  expect(rowArr[1][0]).toEqual({
    top: 2,
    right: 10,
    bottom: 11,
    left: 12,
  });
  expect(rowArr[2][2]).toEqual({
    top: 16,
    right: 22,
    bottom: 23,
    left: 20,
  });
});
