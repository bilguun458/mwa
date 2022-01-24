import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from './brands/brands.component';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  public getAll(keyword: String | undefined): Promise<Brand[]> {
    const url = `${this.baseUrl}/brands?keyword=${keyword}`;

    return this.http.get(url).toPromise()
      .then(res => res as Brand[])
      .catch(this.handleError);
  }

  public getOne(id: String): Promise<Brand> {
    const url = `${this.baseUrl}/brands/${id}`;

    return this.http.get(url).toPromise()
      .then(res => res as Brand)
      .catch(this.handleErrorOne);
  }

  public addOne(data: Brand): Promise<Brand> {
    const url = `${this.baseUrl}/brands`;
    const _brand = {
      title: data.title,
      year: data.year
    }
    return this.http.post(url, _brand).toPromise()
      .then(res => res as Brand)
      .catch(this.handleErrorOne);
  }

  public deleteOne(id: String): Promise<Brand> {
    const url = `${this.baseUrl}/brands/${id}`;
    return this.http.delete(url).toPromise()
      .then(res => res as Brand)
      .catch(this.handleErrorOne);
  }

  public update(id: String, brand: Brand): Promise<Brand> {
    const url = `${this.baseUrl}/brands/${id}`;
    const _brand = {
      title: brand.title,
      year: brand.year
    }
    return this.http.put(url, _brand).toPromise()
      .then(res => res as Brand)
      .catch(this.handleErrorOne);
  }

  private handleErrorOne(err: any): Promise<Brand> {
    return Promise.reject(err)
  }

  private handleError(err: any): Promise<Brand[]> {
    return Promise.reject(err)
  }
}
