import { Component } from '@angular/core';
import { SchoolService } from './school.service';

export class Student {
  _id!: String
  name!: String
  gpa!: Number

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
