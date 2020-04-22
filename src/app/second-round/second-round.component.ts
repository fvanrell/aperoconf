import { Component, EventEmitter, OnInit, Output, Input } from "@angular/core";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { GameService } from 'src/services/game.service';
import { Card } from 'src/models/card';

@Component({
  selector: "app-second-round",
  templateUrl: "./second-round.component.html",
  styleUrls: ["./second-round.component.scss"],
})
export class SecondRoundComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  @Input() currentPlayerCpt: number;
  @Input() currentDeck: Card[];
  @Input() roundNb: number;

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  sendAnswer(value: boolean) {
    this.gameService.setCurrentAnswer(value, this.roundNb, this.currentPlayerCpt, this.currentDeck);
  }
}
