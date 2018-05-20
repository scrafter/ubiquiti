import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { ControlPanelComponent } from './simulator/control-panel/control-panel.component';
import { CanvasComponent } from './simulator/canvas/canvas.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from './shared/components/button/button.component';
import { FieldComponent } from './shared/components/field/field.component';
import { SelectFieldComponent } from './shared/components/select-field/select-field.component';
import { RadioFieldComponent } from './shared/components/radio-field/radio-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    SimulatorComponent,
    ControlPanelComponent,
    CanvasComponent,
    ButtonComponent,
    FieldComponent,
    SelectFieldComponent,
    RadioFieldComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
