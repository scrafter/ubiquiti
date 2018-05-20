import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss']
})
export class RadioFieldComponent implements OnInit {
  @Input() label: string;
  @Input() options: Array<{ label: string, value: any }>;
  @Input() idKey: string;
  @Input() parentFormGroup: FormGroup;
  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

  select(option) {
    const control = this.parentFormGroup.controls[this.name];
    control.setValue(option[this.idKey]);
  }

  isChecked(id) {
    return this.parentFormGroup.value[this.name] === id;
  }
}
