import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Title';
  #name = 'Jack';
  people = ["Jack", "asdf", "rew"]
  students = [{
    name: "Jack",
    gpa: 3.0,
    course: "MWA"
  }, {
    name: "Jill",
    gpa: 4.0,
    course: "MWA"
  }, {
    name: "John",
    gpa: 3.93,
    course: "MWA"
  }]

  showHidden = false;
  dd = new Date();

  get name() { return this.#name }

  onClickBtn() {
    this.title = "Click"
  }

}
