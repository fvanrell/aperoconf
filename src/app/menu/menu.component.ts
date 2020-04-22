import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  faPauseCircle,
  faPlayCircle,
  faRedo,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  faPlayCircle = faPlayCircle;
  faPauseCircle = faPauseCircle;
  faRedo = faRedo;

  @Output() gameStarted = new EventEmitter<boolean>();
  @Output() gameRestarted = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit() {}

  startGame(started: boolean) {
    this.gameStarted.emit(started);
  }

  restart(restarted: boolean) {
    console.log('menu clicked', restarted);
    this.gameRestarted.emit(restarted);
  }
}
