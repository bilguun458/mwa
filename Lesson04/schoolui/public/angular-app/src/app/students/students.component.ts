import { Component } from '@angular/core';
import { SchoolService } from '..//school.service';

export class Student {
  _id!: String
  name!: String
  gpa!: Number

}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  public students: Student[] = []

  constructor(private schoolService: SchoolService) { }

  ngOnInit(): void {
    this.search()
  }

  private search(): void {
    this.schoolService.getAll()
      .then(res => this.students = res)
      .catch(this.handleErorr)
  }

  private handleErorr(err: any) {
    console.log(err);
  }
}
