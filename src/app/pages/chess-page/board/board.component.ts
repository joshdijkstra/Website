import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pieces } from '../model/Piece';
import { environment } from './../../../../environments/environment';

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
  serverStatus = false;
  sessionId = null;

  constructor() {
    this.initializeWebSocketConnection();
  }
  public stompClient: any;
  public msg: any;
  public callback: any;

  initializeWebSocketConnection() {
    // const serverUrl = 'http://localhost:8081/socket';
    const serverUrl = environment.chessURL + 'socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.debug = null
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect(
      
      { usename: 'mylogin', passcode: 'mypasscode' },
      function (frame: any) {
        
        that.stompClient.subscribe('/message', (message: any) => {
          if (message.body) {
            that.sessionId = ws._transport.url.split("/")[5]
            that.displayPieces(JSON.parse(message.body));
          }
        });
        that.stompClient.send('/app/send/message', {});
        that.serverStatus = true;
      }
    );
  }

  axisVertical = ['1', '2', '3', '4', '5', '6', '7', '8'];
  axisHorizontal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  url = 'api/v1/game';

  ngOnDestroy() {
    this.stompClient.disconnect();
    this.serverStatus = false;
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
    let axisHor = this.axisHorizontal
    axisHor = this.playerWhite ? axisHor : axisHor.reverse()
    console.log("To: " + toX + " , " + toY)
    var requestBody: String =
      this.axisHorizontal[atX] +
      this.axisVertical[atY] +
      this.axisHorizontal[toX] +
      this.axisVertical[toY];
    if (promote) {
      requestBody += promote;
    }
    axisHor = this.playerWhite ? axisHor : axisHor.reverse()
    this.stompClient.send('/app/ws-makemove', {}, requestBody);
  };

  public isSquareAttacked = (x: number, y: number) => {
    console.log(this.board.squares[x][y].attackedWhite);
    return this.board.squares[x][y].attackedWhite;
  };

  public isLegalSquare = (x: number, y: number) => {
    x = !this.playerWhite ? 7- x : x
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
    x = !this.playerWhite ? 7- x : x
    if (this.board != undefined && this.board.squares[x][y].piece != null) {
      return true;
    } else {
      return false;
    }
  };

  public lookUpImage = (x: number, y: number) => {
    x = !this.playerWhite ? 7- x : x
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

  public displayPieces = (res: any) => {
    this.playerWhite = this.findBlackOrWhite(res)
    this.board = res.gameObjects.board;
    console.log(res);
    return res;
  };

  public findBlackOrWhite = (gameObjects: { player1: any; player2: any; }) => {
    if (gameObjects != null) {
      for (let player of [gameObjects.player1, gameObjects.player2]) {
        if (player.id === this.sessionId) {
          return player.colour === "white"
        }
      }
    }
    return true
  }

  public dragStarted = (event: any, i: number, j: number) => {
    console.log('moving:', i, j);
    i = !this.playerWhite ? 7- i : i
    this.activeX = i;
    this.activeY = this.playerWhite ?  7 - j : j;
  };

  public dragStopped = (event: any, i: number, j: number) => {
    j = this.playerWhite ? 7-j : j
    console.log("i, j : " + i + " , " + j)
    let dx = Math.round(event.source._dragRef._activeTransform.x / 100);
    let dy = (event.source._dragRef._activeTransform.y * -1) / 100;
    dy = this.playerWhite ? Math.round(dy) : Math.round(dy) *-1
    this.makeMove(i, j, i + dx, j + dy  );
    this.activeX = null;
    this.activeY = null;
  };
}
