import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { ErrorPAgeComponent } from './error-page/error-page.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPAgeComponent,
    MoviesComponent,
    MovieComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{
      path: "",
      component: MoviesComponent
    }, {
      path: "movie/:id",
      component: MovieComponent
    }, {
      path: "**",
      component: ErrorPAgeComponent
    }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
