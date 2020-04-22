import { Component, OnInit, OnDestroy } from "@angular/core";
import { Card } from "../models/card";
import { Player } from "../models/player";
import deck from "../assets/cards.json";
import { GameService } from "../services/game.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  title = "Pyramide";
  deck: Card[];
  message: string;
  messages: string[] = [];
  selectedGame: string;
  getPlayerSub: Subscription;
  getSelectedGameSub: Subscription;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.deck = deck;

    this.getSelectedGameSub = this.gameService
    .getSelectedGame()
    .subscribe((game: string) => {
      this.selectedGame = game;
    });

    this.gameService
    .restartGame()
    .subscribe((bool: boolean) => {
      console.log('yes jai bien recu');
      this.restart();
    });
  }

  selectGame(game: string){
    this.gameService.selectGame(game);
  }

  toggleRestart(bool) {
    console.log('app click', bool);
    this.gameService.setRestartGame(bool);
  }

  restart() {
    console.log('je suis passé dans restart');
    this.selectedGame = ' ';
    setTimeout(() => {
      this.selectedGame = 'pyramide';
    },
    100);
  }

  ngOnDestroy() {
    this.getSelectedGameSub.unsubscribe();
  }
}
