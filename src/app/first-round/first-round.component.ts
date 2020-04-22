import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { GameService } from 'src/services/game.service';
import { Player } from 'src/models/player';
import { Card } from 'src/models/card';

@Component({
  selector: "app-first-round",
  templateUrl: "./first-round.component.html",
  styleUrls: ["./first-round.component.scss"],
})
export class FirstRoundComponent implements OnInit {
  faCircle = faCircle;
  @Input() currentPlayerCpt: number;
  @Input() currentDeck: Card[];
  @Input() roundNb: number;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  sendAnswer(color: number) {
    this.gameService.setCurrentAnswer(color, this.roundNb, this.currentPlayerCpt, this.currentDeck);
  }
}
