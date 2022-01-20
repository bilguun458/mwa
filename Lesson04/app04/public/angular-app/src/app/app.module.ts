import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router"

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    GamesComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: "",
      component: HomeComponent
    }, {
      path: "games",
      component: GamesComponent
    }, {
      path: "**",
      component: ErrorPageComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
