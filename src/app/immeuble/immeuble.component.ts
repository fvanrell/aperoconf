import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Card } from "../../models/card";
import { Player } from "../../models/player";
import { faMinusCircle, faPlusCircle, faForward } from "@fortawesome/free-solid-svg-icons";
import { GameService } from 'src/services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-immeuble',
  templateUrl: './immeuble.component.html',
  styleUrls: ['./immeuble.component.scss']
})
export class ImmeubleComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faForward = faForward;
  @Input() deck: Card[];
  players: Player[] = [];
  currentSelectedAnswer: any;
  currentPlayer: Player;
  starterCard: Card;
  previousCard: Card;
  gameCards: Card[];
  title: string;
  currentChoice: boolean;
  isCorrect: number;
  selectedFloor: number;
  drinkCounter: number;
  roundCounter: number;
  getPlayersSub: Subscription;
  gameStarted = false;
  dialog = false;
  isLast = false;
  cpt = 1;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.drinkCounter = 0;
    this.roundCounter = 0;

    this.getPlayersSub = this.gameService
    .getPlayers()
    .subscribe((player: Player) => {
      this.players.push(player);
    });
  }

  addPlayer(value: string) {
    const newPlayer = new Player(this.players.length + 1, value, [], null);
    this.gameService.addPlayer(newPlayer);
  }


  returnCard(card: Card, greater: boolean, floor: number) {
    if (card.shown) {
      if (this.deck.length === 0) {
        this.isCorrect = 3;
        this.dialog = true;
      }
      const index = this.gameCards.findIndex(crd => crd === card);
      console.log(index);
      this.gameCards[index] = this.deck[0];
      this.deck = this.deck.slice(1, this.deck.length);
      this.drinkCounter = 0;
      this.roundCounter = 0;
    } else {
      card.shown = true;
      this.drinkCounter += floor;
      this.roundCounter += 1 ;
      this.currentPlayer = this.players.find(
        (player) => player.id === this.cpt
      );
      if (this.roundCounter === 1) {
        this.previousCard = card;

        if ((greater && card.rank < this.starterCard.rank) ||
        (!greater && card.rank >= this.starterCard.rank)) {
          this.isCorrect = 1;
          this.dialog = true;
        }
      } else if (this.roundCounter > 1 && this.roundCounter < 12) {
        if ((greater && this.previousCard.rank > card.rank) ||
        (!greater && this.previousCard.rank <= card.rank)) {
          this.isCorrect = 1;
          this.dialog = true;
        }

        this.previousCard = card;
      } else if (this.roundCounter === 12) {
        if ((greater && this.previousCard.rank > card.rank) ||
        (!greater && this.previousCard.rank <= card.rank)) {
          this.isCorrect = 1;
          this.dialog = true;
        } else if ((greater && card.rank >= this.previousCard.rank) ||
        (!greater && card.rank < this.previousCard.rank)) {
          this.isCorrect = 2;
          this.dialog = true;
        }
      }
    }
  }

  nextPlayer() {
    if (this.cpt < this.players.length) {
      this.cpt += 1;
    } else {
      this.cpt = 1;
    }
  }

  closeModal(closed: boolean) {
    this.dialog = false;
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

    array = array.forEach(card => {
      card.shown = false;
    });

    return array;
  }

  getStarterCard() {
    while (![6, 7, 8, 9, 10].includes(this.deck[0].rank)) {
      this.shuffle(this.deck);
    }
    const card = this.deck[0];
    card.shown = true;
    this.deck = this.deck.slice(1, this.deck.length);

    return card;
  }

  startGame(started: boolean) {
    this.gameStarted = true;
    if (started) {
      this.shuffle(this.deck);
      this.title = "Immeuble";
      this.starterCard = this.getStarterCard();
      this.deck.forEach(card => card.shown = false);
      this.gameCards = this.deck.slice(0, 12);
      this.deck = this.deck.slice(13, this.deck.length);
      console.log(this.starterCard);
    }
  }

}
