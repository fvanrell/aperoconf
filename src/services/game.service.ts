import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Player } from 'src/models/player';
import { Card } from 'src/models/card';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = 'https://floating-tundra-54962.herokuapp.com/';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public addPlayer(player: Player) {
    this.socket.emit('new-player', player);
  }

  public getPlayers = () => {
    return Observable.create((observer) => {
        this.socket.on('new-player', (player) => {
          observer.next(player);
        });
    });
  }

  public selectGame(game: string) {
    this.socket.emit('new-game', game);
  }

  public getSelectedGame = () => {
    return Observable.create((observer) => {
        this.socket.on('new-game', (game) => {
          observer.next(game);
        });
    });
  }

  public startGame(started: boolean) {
    this.socket.emit('start-game', started);
  }

  public isGameStarted = () => {
    return Observable.create((observer) => {
        this.socket.on('start-game', (started) => {
          observer.next(started);
        });
    });
  }

  public setDeck(deck: Card[]) {
    this.socket.emit('set-deck', deck);
  }

  public getDeck = () => {
    return Observable.create((observer) => {
        this.socket.on('set-deck', (deck) => {
          observer.next(deck);
        });
    });
  }

  public setRound(round: number) {
    this.socket.emit('set-round', round);
  }

  public getRound = () => {
    return Observable.create((observer) => {
        this.socket.on('set-round', (round) => {
          observer.next(round);
        });
    });
  }

  public setDialogClosed(bool: boolean) {
    this.socket.emit('close-dialog', bool);
  }

  public closeDialog = () => {
    return Observable.create((observer) => {
        this.socket.on('close-dialog', (bool) => {
          observer.next(bool);
        });
    });
  }

  public setFirstPartOver(bool: boolean) {
    this.socket.emit('end-first-part', bool);
  }

  public endFirstPart = () => {
    return Observable.create((observer) => {
        this.socket.on('end-first-part', (bool) => {
          observer.next(bool);
        });
    });
  }

  public setCardShown(index: number, bool: boolean) {
    this.socket.emit('return-card', [index, bool]);
  }

  public isCardShown = () => {
    return Observable.create((observer) => {
        this.socket.on('return-card', ([index, bool]) => {
          observer.next([index, bool]);
        });
    });
  }


  public setPlayerCardShown(playerIdx: number, index: number, bool: boolean) {
    this.socket.emit('return-player-card', [playerIdx, index, bool]);
  }

  public isPlayerCardShown = () => {
    return Observable.create((observer) => {
        this.socket.on('return-player-card', ([playerIdx, index, bool]) => {
          observer.next([playerIdx, index, bool]);
        });
    });
  }

  public setCurrentAnswer(value, round: number, playerCpt: number, deck: Card[]) {
    this.socket.emit('set-current-answer', [value, round, playerCpt, deck]);
  }

  public getCurrentAnswer = () => {
    return Observable.create((observer) => {
        this.socket.on('set-current-answer', ([value, round, playerCpt, deck]) => {
          observer.next([value, round, playerCpt, deck]);
        });
    });
  }

  public setRestartGame(restart: boolean) {
    this.socket.emit('restart', restart);
  }

  public restartGame = () => {
    return Observable.create((observer) => {
        this.socket.on('restart', (restart) => {
          observer.next(restart);
        });
    });
  }
}

