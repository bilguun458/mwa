import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {
  #apiBaseUrl: string = 'https://www.freetogame.com';

  constructor(private http: HttpClient) { }

  public getGames(): Promise<Game[]> {

    const url = this.#apiBaseUrl + "/api/games";
    return this.http.get(url).toPromise()
      .then(res => res as Game[])
      .catch(this.handleError);
  }

  private handleError(err: any): Promise<any> {
    console.log(err);
    return Promise.reject(err.message() || err);
  }
}
