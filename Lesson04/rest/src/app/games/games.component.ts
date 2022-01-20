import { Component, OnInit } from '@angular/core';

import { GamesApiService } from '../games-api.service';


export class Game {
  #title!: string;
  #short_description!: string;
  #release_date!: string[];
  get title() { return this.#title }
  get short_description() { return this.#short_description }
  get release_date() { return this.#release_date }
  constructor(title: string, short_description: string, release_date: string[]) {
    this.#short_description = short_description;
    this.#title = title;
    this.#release_date = release_date;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private gamesService: GamesApiService) { }

  ngOnInit(): void {
    this.gamesService.getGames().then((games) => {
      console.log("facts: ", games);
      this.games = games;
    });
  }

}
