import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input()
  x!: number;
  @Input()
  y!: number;
  z!: number;
  @Output()
  addEvent: EventEmitter<number> = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  add(): void {
    this.z = this.x + 10;
    this.addEvent.emit(this.z)
  }
}
