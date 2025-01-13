import { Component } from '@angular/core';
import { ChessBoardComponent } from "./module/chess-board/chess-board.component";

@Component({
  selector: 'app-root',
  imports: [ChessBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chess-game';
}
