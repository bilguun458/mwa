import { Component } from '@angular/core';
import school from './school.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab1';
  public studs: { name: string, gpa: number }[] = school;
}
