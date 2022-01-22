import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { JobService } from '../job.service';
import { Job } from '../jobs/jobs.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  job!: Job;
  id!: string;

  constructor(private route: ActivatedRoute, private jobService: JobService, private _location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.jobService.getOne(this.id)
      .then((job: Job) => this.setJob(job))
      .catch((err: any) => this._errorHandler(err))
  }

  private setJob(job: Job) {
    this.job = job;
  }

  private _errorHandler(err: any) {
    console.log("error from job: ", err);
  }

  public delete(): void {
    this.jobService.deleteOne(this.id)
      .then(() => this._location.back())
      .catch((err: any) => this._errorHandler(err))
  }
}
