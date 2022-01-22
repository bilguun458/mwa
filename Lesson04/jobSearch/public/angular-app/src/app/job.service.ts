import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Job } from './jobs/jobs.component';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = "http://localhost:3000/api"

  constructor(private http: HttpClient) { }

  public getAll(): Promise<Job[]> {
    const url = `${this.baseUrl}/jobs`;
    return this.http.get(url).toPromise()
      .then(jobs => jobs as Job[])
      .catch(this.catchErr)
  }

  private catchErr(err: any): Promise<Job[]> {
    return Promise.reject(err.message());
  }

  public getOne(id: string): Promise<Job> {
    let url: string = `${this.baseUrl}/jobs/${id}`;
    return this.http.get(url).toPromise()
      .then(response => response as Job)
      .catch(this.handleJobError);
  }

  public addOne(job: Job): Promise<Job> {
    console.log(job);

    let url: string = `${this.baseUrl}/jobs`;
    return this.http.post(url, { title: job.title, salary: job.salary }).toPromise()
      .then(response => response as Job)
      .catch(this.handleJobError);
  }

  public deleteOne(id: string): Promise<Job> {
    let url: string = `${this.baseUrl}/jobs/${id}`;
    return this.http.delete(url).toPromise()
      .then(response => response as Job)
      .catch(this.handleJobError);
  }

  private handleJobError(err: any): Promise<Job> {
    console.log(err);
    return Promise.reject(err.message());
  }
}
