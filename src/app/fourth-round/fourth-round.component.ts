import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { GameService } from 'src/services/game.service';
import { Card } from 'src/models/card';

@Component({
  selector: "app-fourth-round",
  templateUrl: "./fourth-round.component.html",
  styleUrls: ["./fourth-round.component.scss"],
})
export class FourthRoundComponent implements OnInit {
  @Input() currentPlayerCpt: number;
  @Input() currentDeck: Card[];
  @Input() roundNb: number;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  sendAnswer(color: number) {
    this.gameService.setCurrentAnswer(color, this.roundNb, this.currentPlayerCpt, this.currentDeck);
  }
}
