import { Observable, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { Product, SalesPoint } from '@modules/offers/interfaces/offers.interface';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ChangedNames } from '@modules/admin/interfaces/admin-form-response.interface';
import { OfferFormHandlerService } from '@modules/admin/pages/offer/services/offer-form-handler.service';

@Component({
  selector: 'offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class OfferAddComponent implements OnInit {

  form: FormGroup;
  products$: Observable<Product[]>;
  salesPoints$: Observable<SalesPoint[]>;
  salesPointsFixedNames: ChangedNames[] = [];

  constructor(
    private controlContainer: ControlContainer,
    private offerFormHandlerService: OfferFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.offerFormHandlerService.setFormGroupForOfferAdd(this.form);

    this.products$ = this.adminStorageService.products$.asObservable();
    this.salesPoints$ = this.adminStorageService.salesPoints$.asObservable();

    this.salesPoints$.subscribe((result) => result.map((res) => {
      this.salesPointsFixedNames.push({
        id: res.id,
        changedName: res.name + ', ' + res.address.city + ' ul. ' + res.address.street + ' ' + res.address.number,
      })
    }));

    this.form.get('price').valueChanges.subscribe((res) => {
      if (Number.isNaN(Number(res))) {
        this.form.get('price').setErrors({ 'incorrect': true });
      }
    });
  }
}
