import { Component, OnInit } from '@angular/core';

class Game {
  #title!: string;
  #price!: number;
  get title() { return this.#title }
  get price() { return this.#price }
  constructor(title: string, price: number) {
    this.#price = price;
    this.#title = title;
  }
}

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[] = [];
  constructor() {
    let game1 = new Game("Catan", 40.0);
    this.games.push(game1)
    let game2 = new Game("Onitama", 30.0);
    this.games.push(game2)
  }

  ngOnInit(): void {

  }

}
