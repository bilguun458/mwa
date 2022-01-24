import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BikeService } from '../bike.service';
import { BrandService } from '../brand.service';
import { Brand } from '../brands/brands.component';

export class Bike {
  _id!: String
  model!: String
  price!: Number
  weight!: Bike[]
}

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {
  public bikes: Bike[] = []
  public brand!: Brand;
  public newBike!: Bike;

  constructor(private bikeService: BikeService, private brandService: BrandService, private _location: Location, private route: ActivatedRoute) {
    this.newBike = new Bike()
  }

  ngOnInit(): void {
    this.search()
  }

  private handleErorr(err: any) {
    console.log(err);
  }

  private search(): void {
    let brandId = this.route.snapshot.params["id"];
    this.brandService.getOne(brandId).then((res) => {
      this.bikes = res.bikes
      this.brand = res
    }).catch(this.handleErorr)
  }

  public save(): void {
    const brandId = this.route.snapshot.params["id"];
    this.bikeService.addOne(brandId, this.newBike)
      .then(() => this.search())
      .catch(this.handleErorr)
  }

  public delete(): void {
    let brandId = this.route.snapshot.params["id"];
    this.brandService.deleteOne(brandId)
      .then(() => this._location.back())
      .catch(this.handleErorr)
  }

  public update(): void {
    let brandId = this.route.snapshot.params["id"];
    this.brandService.update(brandId, this.brand)
      .then(() => this.search())
      .catch(this.handleErorr)
  }
}
