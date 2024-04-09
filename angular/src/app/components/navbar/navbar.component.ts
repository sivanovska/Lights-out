import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() playPressed = new EventEmitter<void>();
  @Output() createPressed=  new EventEmitter<void>();

  playGame(){
    this.playPressed.emit()
  }

  createGame(){
    this.createPressed.emit()
  }


  
}
