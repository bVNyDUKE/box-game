export type BoxData = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export function makeInitialState(cols: number, rows: number): BoxData[][] {
  const rowArr: BoxData[][] = [];
  let id = 0;

  //write a test for this
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
