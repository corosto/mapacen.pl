import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { OffersService } from '@modules/offers/api/offers.service';
import { OffersComponent } from '@modules/offers/offers.component';
import { MyInputModule } from '@shared/modules/my-input/my-input.module';

@NgModule({
  declarations: [
    OffersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MyInputModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    ReactiveFormsModule,
  ],
  exports: [
    OffersComponent,
  ],
  providers: [
    OffersService,
  ],
})
export class OffersModule { }
