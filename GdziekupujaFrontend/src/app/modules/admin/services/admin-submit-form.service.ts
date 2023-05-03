import { Api } from '@core/enums/api.enum';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AllAdminActionsType } from '@modules/admin/types/admin-actions.types';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

@Injectable()
export class AdminSubmitFormService {

  data: Observable<number>;

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  sendForm(form: FormGroup, currentAction: AllAdminActionsType): Observable<number> {
    switch (currentAction) {//średnio zrobione ale nie chce mi sie myśleć nad lepszym sposobem
      case 'AddOffer': {
        this.data = this.addOffer(form);
        break;
      }
      case 'ModifyOffer': {
        this.data = this.modifyOffer(form);
        break;
      }
      case 'AddCategory': {
        this.data = this.addCategory(form);
        break;
      }
      case 'ModifyCategory': {
        this.data = this.modifyCategory(form);
        break;
      }
      case 'AddProduct': {
        this.data = this.addProduct(form);
        break;
      }
      case 'ModifyProduct': {
        this.data = this.modifyProduct(form);
        break;
      }
      case 'AddSalesPoint': {
        this.data = this.addSalesPoint(form);
        break;
      }
      case 'ModifySalesPoint': {
        this.data = this.modifySalesPoint(form);
        break;
      }
      case 'BanUser': {
        this.data = this.banUser(form);
        break;
      }
      case 'UnbanUser': {
        this.data = this.unbanUser(form);
        break;
      }
      default: {
        break;
      }
    }
    return this.data;
  }

  addOffer(form: FormGroup): Observable<number> {
    const price = Number(form.value.price);
    const productId = form.value.product;
    const salesPointId = form.value.salesPoint;

    return this.http.post<number>(`${environment.httpBackend}${Api.OFFERS}`, { price, productId, salesPointId }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Price ? err.error.errors.Price[0] : 'Nie udało się dodać oferty');
        return of();
      }),
    );
  }

  modifyOffer(form: FormGroup): Observable<number> {
    const params = new HttpParams()
      .set('id', form.value.offer)
      .set('price', Number(form.value.price))

    return this.http.put<number>(`${environment.httpBackend}${Api.OFFERS}`, {}, { params }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Price ? err.error.errors.Price[0] : 'Nie udało się zmodyfikować oferty');
        return of();
      }),
    );
  }

  addCategory(form: FormGroup): Observable<number> {
    const name = form.value.name;

    return this.http.post<number>(`${environment.httpBackend}${Api.CATEGORIES}`, { name }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się dodać kategorii');
        return of();
      }),
    );
  }

  modifyCategory(form: FormGroup): Observable<number> {
    const name = form.value.name;

    return this.http.put<number>(`${environment.httpBackend}${Api.CATEGORY}`.replace(':id', form.value.category), { name }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się zmodyfikować kategorii');
        return of();
      }),
    );
  }

  addProduct(form: FormGroup): Observable<number> {

    const formData = new FormData();
    formData.append('Name', form.value.name);
    formData.append('CategoryId', form.value.category);
    formData.append('Image', form.value.image);

    return this.http.post<number>(`${environment.httpBackend}${Api.PRODUCTS}`, formData).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się dodać produktu');
        return of();
      }),
    );
  }

  modifyProduct(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const categoryId = form.value.category;

    return this.http.put<number>(`${environment.httpBackend}${Api.PRODUCT_UPDATE}`.replace(':id', form.value.product), { name, categoryId }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się zmodyfikować produktu');
        return of();
      }),
    );
  }

  addSalesPoint(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const address = {
      city: form.value.city,
      street: form.value.street,
      postalCode: form.value.postalCode,
      number: Number(form.value.number),
      countyId: form.value.countyId ? form.value.countyId : Number(localStorage.getItem('userProfileCountyId')),
    };

    return this.http.post<number>(`${environment.httpBackend}${Api.SALES_POINTS}`, { name, address }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się dodać punktu sprzedaży');
        return of();
      }),
    );
  }

  modifySalesPoint(form: FormGroup): Observable<number> {
    const name = form.value.name;
    const address = {
      city: form.value.city,
      street: form.value.street,
      postalCode: form.value.postalCode,
      number: Number(form.value.number),
      countyId: form.value.countyId ? form.value.countyId : Number(localStorage.getItem('userProfileCountyId')),
    };

    return this.http.put<number>(`${environment.httpBackend}${Api.SALES_POINT_UPDATE}`.replace(':id', form.value.salesPoint), { name, address }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się zmodyfikować punktu sprzedaży');
        return of();
      }),
    );
  }

  banUser(form: FormGroup): Observable<number> {
    return this.http.put<any>(`${environment.httpBackend}${Api.BAN}`
      .replace(':id', form.get('userId').value), {}).pipe(
        catchError((err) => {
          this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się zbanować użytkownika');
          return of();
        }),
      );
  }

  unbanUser(form: FormGroup): Observable<number> {
    return this.http.put<any>(`${environment.httpBackend}${Api.UNBAN}`
      .replace(':id', form.get('userId').value), {}).pipe(
        catchError((err) => {
          this.toastMessageService.notifyOfError(err.error.errors?.Name ? err.error.errors.Name[0] : 'Nie udało się odbanować użytkownika');
          return of();
        }),
      );
  }
}
