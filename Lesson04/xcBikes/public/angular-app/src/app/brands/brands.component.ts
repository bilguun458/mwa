import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bike } from '../bikes/bikes.component';
import { BrandService } from '../brand.service';

export class Brand {
  _id!: String
  title!: String
  year!: String
  bikes!: Bike[]

}

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  public brands: Brand[] = []
  public newBrand!: Brand;
  public keyword!: String;

  constructor(private brandService: BrandService) {
    this.newBrand = new Brand()
  }

  ngOnInit(): void {
    this.search()
  }

  private handleErorr(err: any) {
    console.log(err);
  }

  public searchKeyword(): void {
    this.search()
  }

  private search(): void {
    this.brandService.getAll(this.keyword || "")
      .then(res => this.brands = res)
      .catch(this.handleErorr)
  }

  public save(): void {
    this.brandService.addOne(this.newBrand)
      .then(() => this.search())
      .catch(this.handleErorr)
  }
}
