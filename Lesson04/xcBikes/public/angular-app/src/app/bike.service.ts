import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bike } from './bikes/bikes.component';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private baseUrl = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  public getAll(): Promise<Bike[]> {
    const url = `${this.baseUrl}/bikes`;

    return this.http.get(url).toPromise()
      .then(res => res as Bike[])
      .catch(this.handleError);
  }

  public getOne(brandId: String, id: String): Promise<Bike> {
    const url = `${this.baseUrl}/brands/${brandId}/bikes/${id}`;

    return this.http.get(url).toPromise()
      .then(res => res as Bike)
      .catch(this.handleErrorOne);
  }

  private handleErrorOne(err: any): Promise<Bike> {
    return Promise.reject(err)
  }

  private handleError(err: any): Promise<Bike[]> {
    return Promise.reject(err)
  }

  public addOne(brandId: string, data: Bike): Promise<Bike> {
    const url = `${this.baseUrl}/brands/${brandId}/bikes`;
    const _bike = {
      model: data.model,
      price: data.price,
      weight: data.weight
    }
    return this.http.post(url, _bike).toPromise()
      .then(res => res as Bike)
      .catch(this.handleErrorOne);
  }

  public deleteOne(brandId: string, id: String): Promise<Bike> {
    const url = `${this.baseUrl}/brands/${brandId}/bikes/${id}`;
    return this.http.delete(url).toPromise()
      .then(res => res as Bike)
      .catch(this.handleErrorOne);
  }

  public update(brandId: string, id: String, bike: Bike): Promise<Bike> {
    const url = `${this.baseUrl}/brands/${brandId}/bikes/${id}`;
    const _bike = {
      model: bike.model,
      price: bike.price,
      weight: bike.weight
    }
    return this.http.put(url, _bike).toPromise()
      .then(res => res as Bike)
      .catch(this.handleErrorOne);
  }
}
