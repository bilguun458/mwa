import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';

export class Game {
  #title!: string;
  #_id!: string;
  #year!: string;
  #rate!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;
  #price!: number;
  get title() { return this.#title }
  set title(title: string) { this.#title = title }
  get _id() { return this.#_id }
  get price() { return this.#price }
  set price(price: number) { this.#price = price }
  get year() { return this.#year }
  set year(year: string) { this.#year = year }
  get rate() { return this.#rate }
  get minPlayers() { return this.#minPlayers }
  get maxPlayers() { return this.#maxPlayers }
  get minAge() { return this.#minAge }
  constructor(
    title: string,
    price: number,
    // id: string,
    // year: string,
    // rate: number,
    // minPlayers: number,
    // maxPlayers: number,
    // minAge: number
  ) {
    this.#title = title;
    this.#price = price;
    // this.#_id = id;
    // this.#year = year;
    // this.#rate = rate;
    // this.#minPlayers = minPlayers;
    // this.#maxPlayers = maxPlayers;
    // this.#minAge = minAge;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];
  newGame!: Game;
  constructor(private gamesDataService: GamesDataService) {
    this.newGame = new Game("", 0)
  }

  ngOnInit(): void {
    this.gamesDataService.getGames()
      .then(response => this._setGames(response))
      .catch(error => this._errorHandler(error))
  }

  private _errorHandler(error: any): void {
    console.log("Error for getting game: ", error);

  }

  private _setGames(games: Game[]): void {
    this.games = games;
  }

  public save(): void {
    this.gamesDataService.addGame(this.newGame)
      .then(response => console.log("Game added!"))
      .catch(error => this._errorHandler(error))
  }
}
