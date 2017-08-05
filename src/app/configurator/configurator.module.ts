import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfiguratorComponent } from './configurator.component';
import { FormColumnComponent } from './form-column/form-column.component';
import { LabelColumnComponent } from './label-column/label-column.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [
    ConfiguratorComponent,
    FormColumnComponent,
    LabelColumnComponent,
  ],
  exports: [ConfiguratorComponent]
})
export class ConfiguratorModule {
}
