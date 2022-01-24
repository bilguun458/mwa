import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BikeService } from '../bike.service';
import { Bike } from '../bikes/bikes.component';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {
  public bike!: Bike;

  constructor(private bikesService: BikeService, private _location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.get()
  }

  public delete(): void {
    let brandId = this.route.snapshot.params["brandId"];
    let bikeId = this.route.snapshot.params["id"];
    this.bikesService.deleteOne(brandId, bikeId)
      .then(() => this._location.back())
      .catch(this.handleErorr)
  }

  public update(): void {
    let brandId = this.route.snapshot.params["brandId"];
    let bikeId = this.route.snapshot.params["id"];
    this.bikesService.update(brandId, bikeId, this.bike)
      .then(() => this.get())
      .catch(this.handleErorr)
  }

  private get() {
    let brandId = this.route.snapshot.params["brandId"];
    let bikeId = this.route.snapshot.params["id"];
    console.log(brandId, bikeId);

    this.bikesService.getOne(brandId, bikeId).then((res) =>
      this.bike = res
    ).catch(this.handleErorr)
  }

  private handleErorr(err: any) {
    console.log(err);
  }
}
