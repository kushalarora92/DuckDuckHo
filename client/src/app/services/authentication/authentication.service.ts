import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../../models/IUser';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) { }

  get loggedInUser(): IUser {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  set loggedInUser(user: IUser) {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  async login(email: String, password: String) {
    const response: any = await this.http.post('/api/user/login', { email, password }).toPromise();
    
    if (response.code < 400) {
      this.loggedInUser = response.data;
    }

    return response;
  }
  
  async register(email: String, password: String) {
    const response: any = this.http.post('/api/user/register', { email, password }).toPromise();
    return response;
  }

  async logout() {
    if (this.isLoggedIn) {
      this.loggedInUser = null;
      localStorage.setItem('currentUser', null);
    }
  }

  get isLoggedIn(): Boolean {
    return !!this.loggedInUser;
  }

  openLoginModal() {
    $('#loginModal').modal('show')
  }

  closeLoginModal() {
    $('#loginModal').modal('hide');
  }
}
