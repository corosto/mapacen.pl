import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { Token, TokenContent } from '@modules/top-menu/interfaces/top-menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MyLocalStorageService {

  setStorage(token: Token) {
    localStorage.setItem('userToken', token.tokenContent);

    const tokenData = jwt_decode(token.tokenContent) as TokenContent;
    localStorage.setItem('userName', tokenData.name);
    localStorage.setItem('userEmail', tokenData.email);
    localStorage.setItem('userRole', tokenData.role);
    localStorage.setItem('userProfileCountyId', tokenData.countyId);
    localStorage.setItem('userId', tokenData.userId);
    localStorage.setItem('userCommenting', tokenData.canComment);
  }

  removeStorage() {
    localStorage.clear();
  }

  getRole(): string {
    return localStorage.getItem('userRole');
  }

  isServiceAdmin(): boolean {
    if (this.getRole() === 'Service Administrator') {
      return true;
    }
    return false;
  }

  isLogged(): boolean {
    return !!localStorage.getItem('userToken');
  }
}
