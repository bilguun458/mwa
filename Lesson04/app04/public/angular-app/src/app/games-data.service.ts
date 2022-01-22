import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  private baseUrl: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }

  public getGames(): Promise<Game[]> {
    let url: string = `${this.baseUrl}/games`;
    return this.http.get(url).toPromise()
      .then(response => response as Game[])
      .catch(this.handleError);
  }

  public getOne(id: string): Promise<Game> {
    let url: string = `${this.baseUrl}/games/${id}`;
    return this.http.get(url).toPromise()
      .then(response => response as Game)
      .catch(this.handleGameError);
  }

  public addGame(game: Game): Promise<Game> {
    let url: string = `${this.baseUrl}/games`;
    return this.http.post(url, { title: game.title, price: game.price }).toPromise()
      .then(response => response as Game)
      .catch(this.handleGameError);
  }

  public deleteOne(id: string): Promise<Game> {
    let url: string = `${this.baseUrl}/games/${id}`;
    return this.http.delete(url).toPromise()
      .then(response => response as Game)
      .catch(this.handleGameError);
  }

  private handleError(err: any): Promise<Game[]> {
    console.log(err);
    return Promise.reject(err.message());
  }

  private handleGameError(err: any): Promise<Game> {
    console.log(err);
    return Promise.reject(err.message());
  }
}
