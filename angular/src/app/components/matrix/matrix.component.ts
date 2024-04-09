// matrix.component.ts
import { Component } from '@angular/core';
import { LightsOutService } from '../../lights-out.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.css']
})
export class MatrixComponent {
  constructor(private lightsOutService: LightsOutService) {}

  buttons: any[] = [];
  numRows: number = 3; // Default number of rows
  numCols: number = 3; // Default number of columns
  buttongrid!: HTMLElement | null;
  array: number[][] = []
  previousArray: number[][]=[]
  clickMatrix: number[][]=[]

  ngOnInit(): void {
    this.buttongrid = document.getElementById("button-grid") as HTMLElement
  }
  generateButtons(numButtons: string) {
    const count = parseInt(numButtons, 10);
    this.array = new Array(count)
    if (!isNaN(count)) {
      this.numRows = this.numCols = count; // Set number of rows and columns
      this.buttons = [];
      for (let i = 0; i < count; i++) {
        this.array[i] = new Array(count);
        for (let j = 0; j < count; j++) {
          // Generate a random color between '#183153' and '#ffd401'
          const randomColor = Math.random() < 0.5 ? '#183153' : '#ffd401';
          this.buttons.push({ color: randomColor, showLabel: false });
          console.log(randomColor)
          if(randomColor=='#183153')
          this.array[i][j]=1
          else
          this.array[i][j]=0
        }
      }
      
      this.previousArray = new Array(count)
      for (let i = 0; i < count; i++) {
        this.previousArray[i] = new Array(count);
        for (let j = 0; j < count; j++) {
          this.previousArray[i][j] = this.array[i][j]}}

      switch (count) {
        case 3:
          if (this.buttongrid)
            this.buttongrid.style.width = "150px";
          break;
        case 4:
          if (this.buttongrid)
            this.buttongrid.style.width = "200px";
          break;
        case 5:
          if (this.buttongrid)
            this.buttongrid.style.width = "250px";
          break;
        case 6:
          if (this.buttongrid)
            this.buttongrid.style.width = "300px";
          break;
        case 7:
          if (this.buttongrid)
            this.buttongrid.style.width = "350px";
          break;
        case 8:
          if (this.buttongrid)
            this.buttongrid.style.width = "400px";
          break;
      }
      this.getSolutionClicked = false;    }

    this.lightsOutService.setUpMatrix(this.array);

    const isSolvable = this.lightsOutService.solveLightsOut(0, 0);
    if (isSolvable) {
      console.log('Matrix is solvable.');
    } else {
      console.log('Matrix is not solvable.');
    }
  
  this.clickMatrix = this.lightsOutService.getClickMatrix();
  console.log('Click Matrix:', this.clickMatrix);
  }
  
  getSolutionClicked: boolean = false;
  getSolution(){  
    this.buttons.length=0;
    console.log("bla")
    console.log(this.clickMatrix)
    for (let i = 0; i < this.previousArray.length; i++) {
      for (let j = 0; j < this.previousArray.length; j++) {
        const showLabel = this.clickMatrix[i][j] === 1;
        if(this.previousArray[i][j]==1)
        this.buttons.push({ color: '#183153',  showLabel });
          else
          this.buttons.push({ color:'#ffd401',  showLabel });
  }
}

// this.buttons.forEach(button => button.showLabel = true);

    
switch (this.previousArray.length) {
  case 3:
    if (this.buttongrid)
      this.buttongrid.style.width = "150px";
    break;
  case 4:
    if (this.buttongrid)
      this.buttongrid.style.width = "200px";
    break;
  case 5:
    if (this.buttongrid)
      this.buttongrid.style.width = "250px";
    break;
  case 6:
    if (this.buttongrid)
      this.buttongrid.style.width = "300px";
    break;
  case 7:
    if (this.buttongrid)
      this.buttongrid.style.width = "350px";
    break;
  case 8:
    if (this.buttongrid)
      this.buttongrid.style.width = "400px";
    break;
}
this.getSolutionClicked = true;
}
  changeColor(index: number) {
    const button = this.buttons[index];
    button.color = button.color === '#183153' ? '#ffd401' : '#183153';
    button.showLabel=false;
    // button.showLabel== label? false
    const row = Math.floor(index / this.numCols);
    const col = index % this.numCols;
  
    // Define the indices of the adjacent buttons
    const adjacentIndices = [
      { row: row - 1, col }, // Above
      { row: row + 1, col }, // Below
      { row, col: col - 1 }, // Left
      { row, col: col + 1 }, // Right
    ];
  
    // Loop through adjacent buttons and toggle their colors independently
    adjacentIndices.forEach(({ row, col }) => {
      if (row >= 0 && row < this.numRows && col >= 0 && col < this.numCols) {
        const adjacentIndex = row * this.numCols + col;
        const adjacentButton = this.buttons[adjacentIndex];
        adjacentButton.color = adjacentButton.color === '#183153' ? '#ffd401' : '#183153';
      }
    });

    if (this.checkAllButtonsColor('#183153')) {
      this.openModal();
      console.log("show modal");
    }
  }

  checkAllButtonsColor(color: string): boolean {
    return this.buttons.every(button => button.color === color);
  }

  // checkAllButtonsLabel(): boolean {
  //   return this.buttons.some(button => !button.showLabel);
  // }

  
isClickMatrixZero(): boolean {
  for (let i = 0; i < this.clickMatrix.length; i++) {
    for (let j = 0; j < this.clickMatrix[i].length; j++) {
      if (this.clickMatrix[i][j] !== 0) {
        return false; // If any element is not zero, return false
      }
    }
  }
  return true; // If all elements are zero, return true
}
  

  showModal: boolean = false; // Variable to track modal visibility

  openModal() {
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  

}