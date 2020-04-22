import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CountdownModule } from "ngx-countdown";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FirstRoundComponent } from "./first-round/first-round.component";
import { FourthRoundComponent } from "./fourth-round/fourth-round.component";
import { MenuComponent } from "./menu/menu.component";
import { PlayersComponent } from "./players/players.component";
import { SecondRoundComponent } from "./second-round/second-round.component";
import { ThirdRoundComponent } from "./third-round/third-round.component";
import { DialogComponent } from './dialog/dialog.component';
import { HttpClientModule }    from '@angular/common/http';
import { ImmeubleComponent } from './immeuble/immeuble.component';
import { DialogImmeubleComponent } from './dialog-immeuble/dialog-immeuble.component';
import { GameService } from '../services/game.service';
import { FormsModule } from '@angular/forms';
import { PyramideComponent } from './pyramide/pyramide.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayersComponent,
    MenuComponent,
    FirstRoundComponent,
    SecondRoundComponent,
    ThirdRoundComponent,
    FourthRoundComponent,
    DialogComponent,
    ImmeubleComponent,
    DialogImmeubleComponent,
    PyramideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    CountdownModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent],
})
export class AppModule {}
