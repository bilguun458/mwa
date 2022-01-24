import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../app.component';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  public student!: Student;

  constructor(private schoolService: SchoolService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.search()
  }

  private search(): void {
    let studentId = this.route.snapshot.url[1].path;

    this.schoolService.getOne(studentId)
      .then(res => this.student = res)
      .catch(this.handleErorr)
  }

  private handleErorr(err: any) {
    console.log(err);
  }
}
