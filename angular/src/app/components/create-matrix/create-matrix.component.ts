import { Component } from '@angular/core';
import { LightsOutService } from '../../lights-out.service';

@Component({
  selector: 'app-create-matrix',
  templateUrl: './create-matrix.component.html',
  styleUrl: './create-matrix.component.css'
})
export class CreateMatrixComponent {
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
          this.buttons.push({ color: '#183153', showLabel: false });
          this.array[i][j]=1
        }
      }
      
      // this.previousArray = new Array(count)
      // for (let i = 0; i < count; i++) {
      //   this.previousArray[i] = new Array(count);
      //   for (let j = 0; j < count; j++) {
      //     this.previousArray[i][j] = this.array[i][j]}}

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

   
  
  // this.clickMatrix = this.lightsOutService.getClickMatrix();
  // console.log('Click Matrix:', this.clickMatrix);
  }
  
  getSolutionClicked: boolean = false;
  isSolvable: boolean=false
  isItSolvable(){ 
    console.log("blabla")
    console.log(this.array)

    this.lightsOutService.setUpMatrix(this.array);

    this.isSolvable = this.lightsOutService.solveLightsOut(0, 0);
    if (this.isSolvable) {
      console.log('Matrix is solvable.');
    } else {
      console.log('Matrix is not solvable.');
    } 
    
    this.getSolutionClicked = true;

    
  if (this.getSolutionClicked && this.isSolvable) {
    this.openModal();
    console.log("show modal");
  }
  }


  
  changeColor(index: number) {
    const button = this.buttons[index];
    button.color = button.color === '#183153' ? '#ffd401' : '#183153';
    const row = Math.floor(index / this.numCols);
    const col = index % this.numCols;
  
    if(button.color=='#183153')
      this.array[row][col]=1
    else {
    this.array[row][col]=0
      console.log("boja")
  }
  console.log(this.array)
    button.showLabel=false;
  
  }

  checkAllButtonsColor(color: string): boolean {
    return this.buttons.every(button => button.color === color);
  }

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
