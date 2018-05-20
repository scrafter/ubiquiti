import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent implements OnInit {
  defaultValues = { power: 4, radio: 2.4 };
  settings = this.defaultValues;

  constructor() { }

  ngOnInit() {
  }

  onNewValues(values) {
    this.settings = values;
  }
}
