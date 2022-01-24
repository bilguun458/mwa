import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private baseUrl = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  public getAll(): Promise<Student[]> {
    const url = `${this.baseUrl}/students`;

    return this.http.get(url).toPromise()
      .then(res => res as Student[])
      .catch(this.handleError);
  }


  public getOne(id: String): Promise<Student> {
    const url = `${this.baseUrl}/students/${id}`;

    return this.http.get(url).toPromise()
      .then(res => res as Student)
      .catch(this.handleErrorOne);
  }

  private handleErrorOne(err: any): Promise<Student> {
    return Promise.reject(err)
  }

  private handleError(err: any): Promise<Student[]> {
    return Promise.reject(err)
  }
}
