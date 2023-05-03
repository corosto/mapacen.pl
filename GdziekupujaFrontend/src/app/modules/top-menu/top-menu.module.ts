import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TopMenuService } from './api/top-menu.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TopMenuComponent } from '@modules/top-menu/top-menu.component';
import { MyInputModule } from '@shared/modules/my-input/my-input.module';
import { ToastMessageModule } from '@shared/modules/toast-message/toast-message.module';
import { LoginDialogComponent } from '@modules/top-menu/components/login-dialog/login-dialog.component';
import { AddOfferDialogComponent } from './components/add-offer-dialog/add-offer-dialog.component';
import { AdminSubmitFormService } from '@modules/admin/services/admin-submit-form.service';

@NgModule({
  declarations: [
    TopMenuComponent,
    LoginDialogComponent,
    AddOfferDialogComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MyInputModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ToastMessageModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  exports: [
    TopMenuComponent,
  ],
  providers: [
    TopMenuService,
    AdminSubmitFormService,
  ],
})
export class TopMenuModule { }
