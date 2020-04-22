import { Component, Input, OnInit, ViewChild, Output, EventEmitter, OnDestroy } from "@angular/core";
import { CountdownComponent } from "ngx-countdown";
import { Card } from "../../models/card";
import { Player } from "../../models/player";
import { GameService } from 'src/services/game.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-pyramide',
  templateUrl: './pyramide.component.html',
  styleUrls: ['./pyramide.component.scss']
})
export class PyramideComponent implements OnInit {
  @Input() deck: Card[];
  @Output() gameRestarted = new EventEmitter<boolean>();
  @ViewChild("cd") private countdown: CountdownComponent;
  players: Player[] = [];
  currentSelectedAnswer: any;
  currentPlayer: Player;
  pyramideCards: Card[];
  title: string;
  roundNb: number;
  currentRoundNb: number;
  isCorrect: number;
  gameStarted = false;
  gameStartedSub: Subscription;
  getPlayersSub: Subscription;
  showCountdown = false;
  pyramide = false;
  dialog = false;
  isLast = false;
  cpt = 1;
  constructor(private gameService: GameService) {}

  async ngOnInit() {
    this.gameStartedSub = this.gameService
    .isGameStarted()
    .subscribe((started: boolean) => {
      this.gameStarted = started;
      this.startGame(started);
    });

    this.getPlayersSub = this.gameService
    .getPlayers()
    .subscribe((player: Player) => {
      this.players.push(player);
    });

    this.gameService
    .getDeck()
    .subscribe((deck: Card[]) => {
      this.deck = deck;
    });

    this.gameService
    .getCurrentAnswer()
    .subscribe(([value, round, playerCpt, deck]) => {
      if (round === 1){
        this.solveFirstRound([value, playerCpt, deck]);
      } else if (round === 2) {
        this.solveSecondRound([value, playerCpt, deck]);
      } else if (round === 3) {
        this.solveThirdRound([value, playerCpt, deck]);
      } else if (round === 4) {
        this.solveFourthRound([value, playerCpt, deck]);
      }
    });

    this.gameService
    .closeDialog()
    .subscribe((bool) => {
      this.dialog = !bool;
    });

    this.gameService
    .endFirstPart()
    .subscribe((bool) => {
      this.launchPyramide(bool);
    });

    this.gameService
    .isCardShown()
    .subscribe(([index, bool]) => {
      console.log(index);
      this.pyramideCards[index].shown = bool;
    });
  }

  addPlayer(value: string) {
    const newPlayer = new Player(this.players.length + 1, value, [], null);
    this.gameService.addPlayer(newPlayer);
  }

  returnCard(index: number) {
    const card = this.pyramideCards[index];
    if (card.shown) {
      this.gameService.setCardShown(index, false);
    } else {
      this.gameService.setCardShown(index, true);
    }
  }

  shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  restart(restarted: boolean) {
    console.log('pyramide clicked', restarted);
    this.gameRestarted.emit(restarted);
  }

  startGame(started: boolean) {
    this.gameService.startGame(true);
    this.gameStarted = true;
    this.gameStartedSub.unsubscribe();
    this.getPlayersSub.unsubscribe();
    if (started) {
      this.currentPlayer = this.players.find(
        (player) => player.id === 1
      );
      this.gameService.setDeck(this.shuffle(this.deck));
      this.gameService.setRound(1);
      this.roundNb = 1;
      this.title = "Premier tour";
    }
  }

  launchPyramide(launched: boolean) {
    if (launched) {
      this.players.forEach((player) => {
        player.cards.sort((a, b) => a.rank - b.rank);
      });
      this.showCountdown = true;
      this.countdown.begin();
      this.title = "Mémorisez vos cartes";
    }
  }

  solveFirstRound([color, playerCpt, deck]) {
    this.currentRoundNb = 1;
    if (this.cpt < this.players.length) {
      const player = this.players.find((player) => player.id === playerCpt);
      player.cards.push(this.deck[0]);
      this.currentSelectedAnswer = color;
      this.currentPlayer = player;
      this.deck = deck;
      this.deck = this.deck.slice(1, this.deck.length);
      if (this.currentPlayer.cards[0].color === this.currentSelectedAnswer) {
        this.isCorrect = 1;
        this.dialog = true;
      } else {
        this.isCorrect = 2;
        this.dialog = true;
      }
      this.cpt += 1;
    } else {
      const player = this.players.find((player) => player.id === playerCpt);
      player.cards.push(this.deck[0]);
      this.currentSelectedAnswer = color;
      this.currentPlayer = player;
      this.deck = deck;
      this.deck = this.deck.slice(1, this.deck.length);
      if (this.currentPlayer.cards[0].color === this.currentSelectedAnswer) {
        this.isCorrect = 1;
        this.dialog = true;
      } else {
        this.isCorrect = 2;
        this.dialog = true;
      }
      this.cpt = 1;
      this.title = "Deuxième tour";
      this.roundNb = 2;
    }
  }

  solveSecondRound([value, playerCpt, deck]) {
    this.currentRoundNb = 2;
    if (this.cpt < this.players.length) {
      const player = this.players.find((player) => player.id === playerCpt);
      player.cards.push(this.deck[0]);
      this.currentSelectedAnswer = value;
      this.currentPlayer = player;
      this.deck = deck;
      this.deck = this.deck.slice(1, this.deck.length);
      if (
        (this.currentSelectedAnswer &&
          this.currentPlayer.cards[1].rank >
            this.currentPlayer.cards[0].rank) ||
        (!this.currentSelectedAnswer &&
          this.currentPlayer.cards[1].rank < this.currentPlayer.cards[0].rank)
      ) {
        this.isCorrect = 1;
        this.dialog = true;
      } else if (
        this.currentPlayer.cards[0].rank === this.currentPlayer.cards[1].rank
      ) {
        this.isCorrect = 3;
        this.dialog = true;
      } else {
        this.isCorrect = 2;
        this.dialog = true;
      }
      this.cpt += 1;
    } else {
      const player = this.players.find((player) => player.id === playerCpt);
      player.cards.push(this.deck[0]);
      this.currentSelectedAnswer = value;
      this.currentPlayer = player;
      this.deck = deck;
      this.deck = this.deck.slice(1, this.deck.length);
      if (
        (this.currentSelectedAnswer &&
          this.currentPlayer.cards[1].rank >
            this.currentPlayer.cards[0].rank) ||
        (!this.currentSelectedAnswer &&
          this.currentPlayer.cards[1].rank < this.currentPlayer.cards[0].rank)
      ) {
        this.isCorrect = 1;
        this.dialog = true;
      } else if (
        this.currentPlayer.cards[0].rank === this.currentPlayer.cards[1].rank
      ) {
        this.isCorrect = 3;
        this.dialog = true;
      } else {
        this.isCorrect = 2;
        this.dialog = true;
      }
      this.cpt = 1;
      this.roundNb = 3;
      this.title = "Troisème tour";
    }
  }

  solveThirdRound([value, playerCpt, deck]) {
    this.currentRoundNb = 3;
    if (this.cpt < this.players.length) {
      const player = this.players.find((player) => player.id === playerCpt);
      const ranks = player.cards.map((card) => card.rank);
      const sortedRanks = ranks.sort((a, b) => a - b);
      player.cards.push(this.deck[0]);
      this.currentPlayer = player;
      this.currentSelectedAnswer = value;
      this.deck = deck;
      this.deck = this.deck.slice(1, this.deck.length);
      if (
        this.currentSelectedAnswer &&
        sortedRanks[0] < this.currentPlayer.cards[2].rank &&
        this.currentPlayer.cards[2].rank < sortedRanks[1]
      ) {
        this.isCorrect = 1;
        this.dialog = true;
      } else if (
        !this.currentSelectedAnswer &&
        (sortedRanks[0] > this.currentPlayer.cards[2].rank ||
          this.currentPlayer.cards[2].rank > sortedRanks[1])
      ) {
        this.isCorrect = 1;
        this.dialog = true;
      } else if (
        sortedRanks[0] === this.currentPlayer.cards[2].rank ||
        sortedRanks[1] === this.currentPlayer.cards[2].rank
      ) {
        this.isCorrect = 3;
        this.dialog = true;
      } else {
        this.isCorrect = 2;
        this.dialog = true;
      }
      this.cpt += 1;
    } else {
      const player = this.players.find((player) => player.id === playerCpt);
      const ranks = player.cards.map((card) => card.rank);
      const sortedRanks = ranks.sort((a, b) => a - b);
      player.cards.push(this.deck[0]);
      this.currentPlayer = player;
      this.currentSelectedAnswer = value;
      this.deck = deck;
      this.deck = this.deck.slice(1, this.deck.length);
      if (
        this.currentSelectedAnswer &&
        sortedRanks[0] < this.currentPlayer.cards[2].rank &&
        this.currentPlayer.cards[2].rank < sortedRanks[1]
      ) {
        this.isCorrect = 1;
        this.dialog = true;
      } else if (
        !this.currentSelectedAnswer &&
        (sortedRanks[0] > this.currentPlayer.cards[2].rank ||
          this.currentPlayer.cards[2].rank > sortedRanks[1])
      ) {
        this.isCorrect = 1;
        this.dialog = true;
      } else if (
        sortedRanks[0] === this.currentPlayer.cards[2].rank ||
        sortedRanks[1] === this.currentPlayer.cards[2].rank
      ) {
        this.isCorrect = 3;
        this.dialog = true;
      } else {
        this.isCorrect = 2;
        this.dialog = true;
      }
      this.cpt = 1;
      this.roundNb = 4;
      this.title = "Dernier tour";
    }
  }

  async solveFourthRound([suit, playerCpt, deck]) {
    this.currentRoundNb = 4;
    if (this.cpt < this.players.length) {
      const player = this.players.find((player) => player.id === playerCpt);
      player.cards.push(this.deck[0]);
      this.currentSelectedAnswer = suit;
      this.currentPlayer = player;
      this.deck = deck;
      this.deck = this.deck.slice(1, this.deck.length);
      if (this.currentPlayer.cards[3].suit === this.currentSelectedAnswer) {
        if (
          this.currentPlayer.cards[0].rank ===
            this.currentPlayer.cards[3].rank ||
          this.currentPlayer.cards[1].rank ===
            this.currentPlayer.cards[3].rank ||
          this.currentPlayer.cards[2].rank === this.currentPlayer.cards[3].rank
        ) {
          this.isCorrect = 4;
          this.dialog = true;
        } else {
          this.isCorrect = 1;
          this.dialog = true;
        }
      } else {
        if (
          this.currentPlayer.cards[0].rank ===
            this.currentPlayer.cards[3].rank ||
          this.currentPlayer.cards[1].rank ===
            this.currentPlayer.cards[3].rank ||
          this.currentPlayer.cards[2].rank === this.currentPlayer.cards[3].rank
        ) {
          this.isCorrect = 5;
          this.dialog = true;
        } else {
          this.isCorrect = 2;
          this.dialog = true;
        }
      }
      this.cpt += 1;
    } else {
      this.isLast = true;
      const player = this.players.find((player) => player.id === playerCpt);
      player.cards.push(this.deck[0]);
      this.currentSelectedAnswer = suit;
      this.currentPlayer = player;
      this.deck = deck;
      this.deck = this.deck.slice(1, this.deck.length);
      if (this.currentPlayer.cards[3].suit === this.currentSelectedAnswer) {
        if (
          this.currentPlayer.cards[0].rank ===
            this.currentPlayer.cards[3].rank ||
          this.currentPlayer.cards[1].rank ===
            this.currentPlayer.cards[3].rank ||
          this.currentPlayer.cards[2].rank === this.currentPlayer.cards[3].rank
        ) {
          this.isCorrect = 4;
          this.dialog = true;
        } else {
          this.isCorrect = 1;
          this.dialog = true;
        }
      } else {
        if (
          this.currentPlayer.cards[0].rank ===
            this.currentPlayer.cards[3].rank ||
          this.currentPlayer.cards[1].rank ===
            this.currentPlayer.cards[3].rank ||
          this.currentPlayer.cards[2].rank === this.currentPlayer.cards[3].rank
        ) {
          this.isCorrect = 5;
          this.dialog = true;
        } else {
          this.isCorrect = 2;
          this.dialog = true;
        }
      }
      this.roundNb = null;
    }
  }

  onCountdownOver() {
    this.showCountdown = false;
    this.players.forEach((player) => {
      player.cards.map((card) => {
        card.shown = false;
      });
    });
    this.pyramideCards = this.deck.slice(0, 15).map((card) => {
      card.shown = false;
      return card;
    });
    this.title = "Pyramide Time !";
    this.pyramide = true;
  }
}
