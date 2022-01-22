import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';

export class Job {
  _id!: string;
  title!: string;
  salary!: number
  // location: 
  description!: string;
  experience!: string;
  skills!: string[];
  postDate!: Date;

  constructor() { }
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs!: Job[];
  newJob!: Job;
  constructor(private jobService: JobService) {
    this.newJob = new Job()
  }

  ngOnInit(): void {
    this.jobService.getAll()
      .then((jobs: any) => this.jobs = jobs)
      .catch(this._errorHandler)
  }

  private _errorHandler(error: any): void {
    console.log("Error for getting jobs: ", error);

  }

  public save(): void {
    this.jobService.addOne(this.newJob)
      .then(response => console.log("Job added!" + response))
      .catch(error => this._errorHandler(error))
  }
}
