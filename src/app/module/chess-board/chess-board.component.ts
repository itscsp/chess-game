import { Component } from '@angular/core';
import { ChessBoard } from '../../chess-logic/chess-board';
import {
  Color,
  Coords,
  FENChar,
  pieceImagePaths,
  SafeSquares,
} from '../../chess-logic/pieces/models';
import { CommonModule } from '@angular/common';
import { SelectedSquare } from './models';

@Component({
  selector: 'app-chess-board',
  imports: [CommonModule],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
})
export class ChessBoardComponent {
  public pieceImagePaths = pieceImagePaths;
  private chessBoard = new ChessBoard();
  public chessBoardView: (FENChar | null)[][] = this.chessBoard.chessBoardView;
  public get playerColor(): Color {
    return this.chessBoard.playerColor;
  }
  public get safeSquares(): SafeSquares {
    return this.chessBoard.safeSquares;
  }

  private selectedSquare: SelectedSquare = { piece: null };

  private pieceSafeSquares: Coords[] = [];

  constructor() {
    console.log(pieceImagePaths);
  }
  public isSquareDark(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  }

  public isSquareSelected(x: number, y: number): boolean {
    if (!this.selectedSquare.piece) return false;
    return this.selectedSquare.x === x && this.selectedSquare.y === y;
  }

  public isSquareSafeForSelectedPiece(x: number, y: number): boolean {
    // debugger;
    // console.log(x, y)
    return this.pieceSafeSquares.some(
      (coords) => coords.x === x && coords.y === y
    );
  }

  public selectingPiece(x: number, y: number): void {
    const piece: FENChar | null = this.chessBoardView[x][y];

    console.log(x, y, piece)

    if (!piece) return;
    if(this.isWrongPieceSelected(piece)) return;

    this.selectedSquare = { piece, x, y };
    
    this.pieceSafeSquares = this.safeSquares.get(x + ',' + y) || [];
  }

  private isWrongPieceSelected(piece: FENChar): boolean {
    const isWhitePieceSelected: boolean = piece === piece.toUpperCase();
    return isWhitePieceSelected && this.playerColor === Color.Black || !isWhitePieceSelected && this.playerColor === Color.White;
  }

}
