import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { ControlPanelComponent } from './simulator/control-panel/control-panel.component';
import { CanvasComponent } from './simulator/canvas/canvas.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SimulatorComponent,
    ControlPanelComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
