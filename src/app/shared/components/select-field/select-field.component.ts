import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit {
  @Input() label: string;
  @Input() idKey: string;
  @Input() labelKey: string;
  @Input() options = [];
  @Input() parentFormGroup: FormGroup;
  @Input() name: string;
  @Input() selected = null;
  model = null;

  constructor() { }

  ngOnInit() {
    if (this.selected) {
      this.model = this.selected;
    }
  }
}
