import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableAreaComponent } from '@shared/modules/disable-area/disable-area.component';

@NgModule({
  declarations: [
    DisableAreaComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DisableAreaComponent,
  ],
})
export class DisableAreaModule { }
