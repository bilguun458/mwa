import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  @ViewChild('movieCreateForm')
  movieCreateForm!: NgForm

  constructor(private moviesService: MoviesService) {
    this.fetchMovies()
  }

  ngOnInit(): void {
  }

  onSubmit(ngForm: NgForm) {
    const data = ngForm.form.getRawValue();
    this.moviesService.addOne(data).then(() => this.fetchMovies()).catch((err) => this.errorHandler(err))
  }

  private fetchMovies() {
    this.moviesService.getAll().then((res) => this.handleSuccess(res)).catch((err) => this.errorHandler(err))
  }

  private handleSuccess(res: Movie[]): void {
    this.movies = res
  }
  private errorHandler(err: any): void {
    console.log(err);
  }
}
