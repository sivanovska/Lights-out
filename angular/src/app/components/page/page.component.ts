import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  solve!: HTMLElement | null;
  make!: HTMLElement | null;

  ngOnInit(): void {
    this.solve = document.getElementById("soolve") as HTMLElement;
    this.make = document.getElementById("make") as HTMLElement;
  }

  visibilityCreate() {
      if (this.solve)
          this.solve.style.display = "none";
      if (this.make)
          this.make.style.display = "block";
  }
  visibilityPlay() {
    if (this.solve)
      this.solve.style.display = "block";
  if (this.make)
      this.make.style.display = "none";
}
}
