import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { CharactersComponent } from './characters/characters.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    CharactersComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
