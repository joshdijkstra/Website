import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pieces } from '../model/Piece';

declare var SockJS: any;
declare var Stomp: any;

@Component({
  selector: 'dijkstra-web-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent {
  board: any;
  activeElement: any;
  originalX: any;
  originalY: any;
  activeX: any;
  activeY: any;
  offsetTop: any;
  offsetLeft: any;
  playerWhite = true;
  promoting = false;

  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient: any;
  public msg: any;
  public callback: any;

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8081/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect(
      { login: 'mylogin', passcode: 'mypasscode' },
      function (frame: any) {
        that.stompClient.subscribe('/message', (message: any) => {
          if (message.body) {
            // console.log(JSON.parse(message.body))
            that.diplayPieces(JSON.parse(message.body));
          }
        });
        that.stompClient.send('/app/send/message', {});
      }
    );
  }

  axisVertical = ['1', '2', '3', '4', '5', '6', '7', '8'];
  axisHorizontal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  url = 'api/v1/game';

  ngOnDestroy() {
    this.stompClient.disconnect();
  }

  ngOnInit() {
    // this.showBoard();
    const chessboard = document.getElementById('chessboard');
    if (chessboard != undefined) {
      this.offsetLeft = chessboard?.offsetLeft;
      this.offsetTop = chessboard?.offsetTop;
    }
  }

  public makeMove = (
    atX: number,
    atY: number,
    toX: number,
    toY: number,
    promote?: string
  ) => {
    var requestBody: String =
      this.axisHorizontal[atX] +
      this.axisVertical[atY] +
      this.axisHorizontal[toX] +
      this.axisVertical[toY];
    if (promote) {
      requestBody += promote;
    }
    this.stompClient.send('/app/ws-makemove', {}, requestBody);
  };

  public isSquareAttacked = (x: number, y: number) => {
    console.log(this.board.squares[x][y].attackedWhite);
    return this.board.squares[x][y].attackedWhite;
  };

  public isLegalSquare = (x: number, y: number) => {
    if (
      this.activeX != null &&
      this.activeY != null &&
      this.board != undefined
    ) {
      const moves =
        this.board.squares[this.activeX][this.activeY].piece.pseudoMoves;
      const includesArray = (data: any[], arr: any[]) => {
        return data.some(
          (e) => Array.isArray(e) && e.every((o, i) => Object.is(arr[i], o))
        );
      };
      return includesArray(moves, [x, y]);
    }
    return false;
  };

  public hasPieceOn = (x: number, y: number) => {
    if (this.board != undefined && this.board.squares[x][y].piece != null) {
      return true;
    } else {
      return false;
    }
  };

  public lookUpImage = (x: number, y: number) => {
    const colour = this.board.squares[x][y].piece.isWhite ? 'w' : 'b';
    switch (this.board.squares[x][y].piece.pieceType) {
      case Pieces.PAWN:
        return `assets/pawn_${colour}.png`;
      case Pieces.ROOK:
        return `assets/rook_${colour}.png`;
      case Pieces.KNIGHT:
        return `assets/knight_${colour}.png`;
      case Pieces.BISHOP:
        return `assets/bishop_${colour}.png`;
      case Pieces.KING:
        return `assets/king_${colour}.png`;
      case Pieces.QUEEN:
        return `assets/queen_${colour}.png`;
      default:
        return ``;
    }
  };

  public diplayPieces = (res: any) => {
    this.board = res;
    console.log(res);
    return res;
  };

  public dragStarted = (event: any, i: number, j: number) => {
    console.log('moving:', i, j);
    this.activeX = i;
    this.activeY = 7 - j;
  };

  public dragStopped = (event: any, i: number, j: number) => {
    let dx = Math.round(event.source._dragRef._activeTransform.x / 100);
    let dy = (event.source._dragRef._activeTransform.y * -1) / 100;
    dy = this.playerWhite ? Math.round(dy) : 7 - Math.round(dy);
    let c = !this.playerWhite ? j : 7 - j;
    this.makeMove(i, c, i + dx, c + dy);
    this.activeX = null;
    this.activeY = null;
  };
}
