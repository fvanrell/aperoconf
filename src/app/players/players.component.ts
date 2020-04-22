import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../../models/card";
import { Player } from "../../models/player";
import { GameService } from 'src/services/game.service';

@Component({
  selector: "app-players",
  templateUrl: "./players.component.html",
  styleUrls: ["./players.component.scss"],
})
export class PlayersComponent implements OnInit {
  faExclamationCircle = faExclamationCircle;
  @Input() players: Player[];
  @Output() newPlayer = new EventEmitter<string>();
  showSpan = false;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService
    .isPlayerCardShown()
    .subscribe(([playerIdx, index, bool]) => {
      this.players[playerIdx].cards[index].shown = bool;
    });
  }

  emitName(value: string) {
    if (value === "" || value === " ") {
      this.showSpan = true;
    } else {
      this.newPlayer.emit(value);
    }
  }

  checkName(value: string) {
    if (value === "" || value === " ") {
      this.showSpan = true;
    } else {
      this.showSpan = false;
    }
  }

  returnCard(playerIdx: number, index: number) {
    const player = this.players[playerIdx];
    const card = player.cards[index];
    if (card.shown) {
      this.gameService.setPlayerCardShown(playerIdx, index, false);
    } else {
      this.gameService.setPlayerCardShown(playerIdx, index, true);
    }
  }
}
