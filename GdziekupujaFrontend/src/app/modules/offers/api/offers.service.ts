import { Injectable } from '@angular/core';
import { Api } from '@core/enums/api.enum';
import { environment } from '@env/environment';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MyComment, MainOffer } from '@modules/offers/interfaces/offers.interface';
import { ToastMessageService } from '@shared/modules/toast-message/services/toast-message.service';

@Injectable()
export class OffersService {

  constructor(
    private http: HttpClient,
    private toastMessageService: ToastMessageService,
  ) { }

  getAllOffers(countyId: number, search: string, categoryId: number, page: number, pageSize: number): Observable<MainOffer> {
    const params = new HttpParams()
      .set('countyId', countyId)
      .set('productName', search ? search : '')
      .set('categoryId', categoryId ? categoryId : '')
      .set('pageSize', pageSize)
      .set('pageNumber', page)
      .set('userId', Number(localStorage.getItem('userId')))

    return this.http.get<MainOffer>(`${environment.httpBackend}${Api.OFFERS}`, { params }).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać ofert');
        return of();
      }),
    );
  }

  getFavourites(page: number, pageSize: number): Observable<MainOffer> {
    const params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', page)

    return this.http.get<MainOffer>(`${environment.httpBackend}${Api.FAVOURITES}`
      .replace(':userId', localStorage.getItem('userId')), { params })
      .pipe(
        catchError(() => {
          this.toastMessageService.notifyOfError('Nie udało się pobrać ulubionych');
          return of();
        }),
      );
  }

  updateFavourites(offerId: number, userId: number): Observable<any> {
    const params = new HttpParams()
      .set('offerId', offerId)
      .set('userId', userId)

    return this.http.post<any>(`${environment.httpBackend}${Api.FAVOURITES_UPDATE}`, {}, { params }).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się zaktualizować ulubionych');
        return of();
      }),
    );
  }

  getComments(offerId: number, userId: number): Observable<MyComment[]> {
    const params = new HttpParams()
      .set('offerId', offerId)
      .set('userId', userId)

    return this.http.get<MyComment[]>(`${environment.httpBackend}${Api.OFFER_COMMENTS}`, { params }).pipe(
      catchError(() => {
        this.toastMessageService.notifyOfError('Nie udało się pobrać komentarzy');
        return of([]);
      }),
    );
  }

  addComment(content: string, userId: number, offerId: number): Observable<any> {
    const creationDate = new Date().toISOString();
    return this.http.post<any>(`${environment.httpBackend}${Api.COMMENT}`, { content, userId, offerId, creationDate }).pipe(
      catchError((err) => {
        this.toastMessageService.notifyOfError(err.error.errors?.Content ? err.error.errors.Content[0] : 'Komentowanie nie powiodło się');
        return of();
      }),
    );
  }

  like(commentId: number, userId: number): Observable<any> {
    return this.http.put<any>(`${environment.httpBackend}${Api.COMMENT_LIKE}`
      .replace(':commentId', commentId.toString())
      .replace(':userId', userId.toString()), {}).pipe(
        catchError(() => {
          this.toastMessageService.notifyOfError('Likowanie nie powiodło się');
          return of();
        }),
      );
  }

  dislike(commentId: number, userId: number): Observable<any> {
    return this.http.put<any>(`${environment.httpBackend}${Api.COMMENT_DISLIKE}`
      .replace(':commentId', commentId.toString())
      .replace(':userId', userId.toString()), {}).pipe(
        catchError(() => {
          this.toastMessageService.notifyOfError('Dislikowanie nie powiodło się');
          return of();
        }),
      );
  }

  banUser(id: number): Observable<any> {
    return this.http.put<any>(`${environment.httpBackend}${Api.BAN}`
      .replace(':id', id.toString()), {}).pipe(
        catchError(() => {
          this.toastMessageService.notifyOfError('Nie udało się zbanować użytkownika');
          return of();
        }),
      );
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.httpBackend}${Api.COMMENT_DELETE}`
      .replace(':id', id.toString()), {}).pipe(
        catchError(() => {
          this.toastMessageService.notifyOfError('Usuwanie komentarza nie powiodło się');
          return of();
        }),
      );
  }
}
