import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { powerOptions, radioOptions } from './options.constants';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  powerOptions = powerOptions;
  radioOptions = radioOptions;
  settingsForm: FormGroup;
  @Input() defaultValues = {};
  @Output() onChange = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.settingsForm = this.fb.group(this.defaultValues);
  }

  onSubmit() {
    this.onChange.emit(this.settingsForm.value);
  }

  onReset() {
    this.settingsForm.reset(this.defaultValues);
  }
}
