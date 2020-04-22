import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Card } from 'src/models/card';
import { GameService } from 'src/services/game.service';

@Component({
  selector: "app-third-round",
  templateUrl: "./third-round.component.html",
  styleUrls: ["./third-round.component.scss"],
})
export class ThirdRoundComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  @Input() currentPlayerCpt: number;
  @Input() currentDeck: Card[];
  @Input() roundNb: number;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  sendAnswer(value: boolean) {
    this.gameService.setCurrentAnswer(value, this.roundNb, this.currentPlayerCpt, this.currentDeck);
  }
}
