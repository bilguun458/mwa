import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { Movie } from '../movies/movies.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie!: Movie;
  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private _location: Location) {
    this.fetchMovie()
  }

  ngOnInit(): void { }

  public delete(): void {
    const _id = this.route.snapshot.params["id"]
    this.moviesService.deleteOne(_id).then(() => this._location.back()).catch((err) => this.errorHandler(err))
  }
  public updateOne(ngForm: NgForm): void {
    const _id = this.route.snapshot.params["id"]
    console.log(ngForm.form.getRawValue())
    console.log(this.movie)
  }

  private fetchMovie(): void {
    const _id = this.route.snapshot.params["id"]
    this.moviesService.getOne(_id).then((res) => this.successHandler(res)).catch((err) => this.errorHandler(err))
  }

  private successHandler(res: Movie): void {
    this.movie = res
  }

  private errorHandler(err: any): void {
    console.log(err);
  }

}
