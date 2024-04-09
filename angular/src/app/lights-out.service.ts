import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LightsOutService {
  private grid: number[][] = [];
  private n: number=0;
  private click: number[][] = [];

  constructor() {}

  toggle(row: number, col: number): void {
    this.grid[row][col] = 1 - this.grid[row][col]; // Toggle the current cell

    // Toggle the neighboring cells
    if (row > 0)
      this.grid[row - 1][col] = 1 - this.grid[row - 1][col]; // Toggle cell above
    if (row < this.n - 1)
      this.grid[row + 1][col] = 1 - this.grid[row + 1][col]; // Toggle cell below
    if (col > 0)
      this.grid[row][col - 1] = 1 - this.grid[row][col - 1]; // Toggle cell to the left
    if (col < this.n - 1)
      this.grid[row][col + 1] = 1 - this.grid[row][col + 1]; // Toggle cell to the right
  }

  setUpMatrix(array: number[][]): void {
    this.grid = array;
    this.n = this.grid.length
    this.click = new Array(this.n)
    for(let i = 0;i<this.n;i++) {
      this.click[i] = new Array(this.n);
      for(let j = 0;j<this.n;j++)
        this.click[i][j] = 0;
    }
    // console.log("sewt")
    // console.log(this.grid)
  }

  getClickMatrix (): number [][]{
    return this.click;
  }

  allLightsOn(): boolean {
    for (let i = 0; i < this.n; i++) {
      if (this.grid[this.n - 1][i] !== 1)
        return false;
    }
    return true;
  }

  solveLightsOut(row: number, col: number): boolean {
    // console.log(this.click)
    if (row === this.n) {
      if (this.allLightsOn()) {
        for (let i = 0; i < this.n; i++) {
          console.log(this.grid[i].join(' '));
        }
        return true;
      } else
        return false;
    }
    let nextRow = (col === this.n - 1) ? row + 1 : row;
    let nextCol = (col === this.n - 1) ? 0 : col + 1;

    if (row === 0) {
      this.toggle(row, col);
      this.click[row][col] = 1;
      if (this.solveLightsOut(nextRow, nextCol))
        return true;

      this.toggle(row, col);
      this.click[row][col] = 0;
      return this.solveLightsOut(nextRow, nextCol);
    } else if (row > 0 && this.grid[row - 1][col] === 0) {
      this.toggle(row, col);
      this.click[row][col] = 1;
      if (this.solveLightsOut(nextRow, nextCol))
        return true;
      this.toggle(row, col);
      this.click[row][col] = 0;
      return false;
    }
    return this.solveLightsOut(nextRow, nextCol);
  }

}
