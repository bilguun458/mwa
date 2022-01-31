import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';

export class Movie {
  _id!: String
  title!: String
  poster!: String
  year!: Number
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];
  constructor(private moviesService: MoviesService) {
    this.moviesService.getAll().then((res) => this.handleSuccess(res)).catch((err) => this.errorHandler(err))
  }

  ngOnInit(): void {
  }

  private handleSuccess(res: Movie[]): void {
    this.movies = res
  }
  private errorHandler(err: any): void {
    console.log(err);
  }
}
