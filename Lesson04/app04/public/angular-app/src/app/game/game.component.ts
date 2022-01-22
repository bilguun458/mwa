import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { Location } from '@angular/common';

import { GamesDataService } from '../games-data.service';
import { Game } from '../games/games.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game!: Game;
  id!: string;

  constructor(private route: ActivatedRoute, private gameService: GamesDataService, private _location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.gameService.getOne(this.id)
      .then((game: Game) => this.setGame(game))
      .catch((err: any) => this._errorHandler(err))
  }

  private setGame(game: Game) {
    this.game = game;
  }

  private _errorHandler(err: any) {
    console.log("error from game: ", err);
  }

  public delete(): void {
    this.gameService.deleteOne(this.id)
      .then(() => this._location.back())
      .catch((err: any) => this._errorHandler(err))
  }
}
