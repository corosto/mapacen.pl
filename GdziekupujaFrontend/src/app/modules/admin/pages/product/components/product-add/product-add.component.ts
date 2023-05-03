import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Category } from '@modules/offers/interfaces/offers.interface';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { AdminStorageService } from '@modules/admin/services/admin-storage.service';
import { ProductFormHandlerService } from '@modules/admin/pages/product/services/product-form-handler.service';

@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})

export class ProductAddComponent implements OnInit {

  form: FormGroup;
  categories: Observable<Category[]>;

  constructor(
    private controlContainer: ControlContainer,
    private productFormHandlerService: ProductFormHandlerService,
    private adminStorageService: AdminStorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.controlContainer.control as FormGroup;
    this.productFormHandlerService.setFormGroupForProductAdd(this.form);

    this.categories = this.adminStorageService.categories$.asObservable();
  }

  saveImage(image: File): void {
    this.form.patchValue({
      image: image,
    });
    this.form.get('image').updateValueAndValidity();
  }

}
