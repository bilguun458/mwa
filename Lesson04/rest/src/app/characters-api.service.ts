import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Character } from './characters/characters.component';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {
  #apiBaseUrl: string = 'https://www.anapioficeandfire.com';

  constructor(private http: HttpClient) { }

  public getCharacters(): Promise<Character[]> {

    const url = this.#apiBaseUrl + "/api/characters?page=2&pageSize=10";
    return this.http.get(url).toPromise()
      .then(res => res as Character[])
      .catch(this.handleError);
  }

  private handleError(err: any): Promise<any> {
    console.log(err);
    return Promise.reject(err.message() || err);
  }
}
