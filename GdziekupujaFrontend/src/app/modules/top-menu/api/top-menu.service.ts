import { Api } from '@core/enums/api.enum';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';
import { idNameOnly, Login, Register, Token } from '@modules/top-menu/interfaces/top-menu.interface';

@Injectable()
export class TopMenuService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  getAllCounties(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.COUNTIES}`).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać powiatów');
        return of([]);
      }),
    );
  }

  getAllCategories(): Observable<idNameOnly[]> {
    return this.http.get<idNameOnly[]>(`${environment.httpBackend}${Api.CATEGORIES}`).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać kategorii');
        return of([]);
      }),
    );
  }

  loginUser({ email, password }: Login): Observable<Token> {
    return this.http.post<Token>(`${environment.httpBackend}${Api.LOGIN}`, { email, password }).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError('Niepoprawny e-mail lub hasło');
        return of();
      }),
    );
  }

  registerUser({ name, email, password, confirmedPassword, countyId }: Register): Observable<Register> {
    return this.http.post<Register>(`${environment.httpBackend}${Api.REGISTER}`, { name, email, password, confirmedPassword, countyId }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error);
        return of();
      }),
    );
  }

  updateCounty(userId: string, countyId: string): Observable<any> {
    return this.http.post<any>(`${environment.httpBackend}${Api.UPDATE_USER_COUNTY.replace(':userId', userId).replace(':countyId', countyId)}`, {})
      .pipe(
        catchError(() => {
          this.toastMessageService.notifyOfError('Nie udało się zmienić powiatu');
          return of();
        }),
      );
  }
}