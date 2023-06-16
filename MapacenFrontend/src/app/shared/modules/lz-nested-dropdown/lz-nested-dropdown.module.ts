import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LzNestedDropdownComponent } from '@shared/modules/lz-nested-dropdown/lz-nested-dropdown.component';

@NgModule({
  declarations: [
    LzNestedDropdownComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    LzNestedDropdownComponent,
  ],
})
export class LzNestedDropdownModule { }
