import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: [ './button.component.scss' ],
})
export class ButtonComponent implements OnInit {
  @Input() color: string;
  @Input() type: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Output() onClick = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  click() {
    this.onClick.emit();
  }
}
