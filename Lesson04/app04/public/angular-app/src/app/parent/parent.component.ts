import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  x: number = 10
  y: number = 20
  z!: number
  constructor() { }

  ngOnInit(): void {
  }
  displayAdd(number: number) {
    this.z = number
  }
}
