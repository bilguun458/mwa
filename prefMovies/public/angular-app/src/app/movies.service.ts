import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from './movies/movies.component';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  #baseUrl = "http://localhost:3000/api"
  constructor(private http: HttpClient) { }

  public getAll(): Promise<Movie[]> {
    const url = `${this.#baseUrl}/movies`
    return this.http.get(url).toPromise().catch(this.handleError)
  }

  public getOne(_id: String): Promise<Movie> {
    const url = `${this.#baseUrl}/movies/${_id}`
    return this.http.get(url).toPromise().catch(this.handleError)
  }

  public deleteOne(_id: String): Promise<Movie> {
    const url = `${this.#baseUrl}/movies/${_id}`
    return this.http.delete(url).toPromise().catch(this.handleError)
  }

  public addOne(data: Object): Promise<Movie> {
    const url = `${this.#baseUrl}/movies`
    return this.http.post(url, data).toPromise().catch(this.handleError)
  }

  private handleError(err: any): any {
    return Promise.reject(err)
  }
}
