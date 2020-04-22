import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {} from "protractor";
import { Player } from "../../models/player";

@Component({
  selector: 'app-dialog-immeuble',
  templateUrl: './dialog-immeuble.component.html',
  styleUrls: ['./dialog-immeuble.component.scss']
})
export class DialogImmeubleComponent implements OnInit {
  @Input() player: Player;
  @Input() isCorrect: number;
  @Input() floorNb: number;
  @Output() isClosed = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  close(bool: boolean) {
    this.isClosed.emit(bool);
  }
}
