import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangedNames } from '@modules/admin/interfaces/admin-form-response.interface';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { AdminSubmitFormService } from '@modules/admin/services/admin-submit-form.service';
import { OffersService } from '@modules/offers/api/offers.service';
import { Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-offer-dialog',
  templateUrl: './add-offer-dialog.component.html',
  styleUrls: ['./add-offer-dialog.component.scss']
})
export class AddOfferDialogComponent {

  offerForm: FormGroup;
  products$: Observable<Product[]>;
  salesPoints$: Observable<SalesPoint[]>;
  salesPointsFixedNames: ChangedNames[] = [];

  constructor(
    private fb: FormBuilder,
    private toastMessageService: ToastMessageService,
    private adminSubmitFormService: AdminSubmitFormService,
    private adminStorageService: AdminStorageService,
    public dialogRef: MatDialogRef<AddOfferDialogComponent>,
  ) { }

  ngOnInit() {
    this.offerForm = this.fb.group({
      price: [null, [Validators.required]],
      product: [null, [Validators.required]],
      salesPoint: [null, [Validators.required]],
    });

    this.products$ = this.adminStorageService.getAllProducts();
    this.salesPoints$ = this.adminStorageService.getAllSalesPoints();

    this.salesPoints$.subscribe((result) => result.map((res) => {
      this.salesPointsFixedNames.push({
        id: res.id,
        changedName: res.name + ', ' + res.address.city + ' ul. ' + res.address.street + ' ' + res.address.number,
      })
    }));

    this.offerForm.get('price').valueChanges.subscribe((res) => {
      if (Number.isNaN(Number(res))) {
        this.offerForm.get('price').setErrors({ 'incorrect': true });
      }
    });
  }

  handleFormSubmit() {
    if (this.offerForm.valid) {
      this.adminSubmitFormService.addOffer(this.offerForm).subscribe(() => {
        this.toastMessageService.notifyOfSuccess('Dodano ofertę')
        this.offerForm.reset();
        this.dialogRef.close('refresh');
      })
    }
  }

}
