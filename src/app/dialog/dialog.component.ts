import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {} from "protractor";
import { Player } from "../../models/player";
import { GameService } from 'src/services/game.service';

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  @Input() player: Player;
  @Input() isCorrect: number;
  @Input() roundNb: number;
  @Input() isLast: number;
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() isOver = new EventEmitter<boolean>();

  constructor(private gameService: GameService) {}

  ngOnInit() {}

  close(bool: boolean) {
    if (this.isLast) {
      this.gameService.setDialogClosed(bool);
      this.gameService.setFirstPartOver(bool);
    } else {
      this.gameService.setDialogClosed(bool);
    }
  }
}
