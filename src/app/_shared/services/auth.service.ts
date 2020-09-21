import { Injectable } from '@angular/core';

import { UtilsService } from './utils.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser;
  token;
  constructor(
    private httpService: HttpService,
    private util: UtilsService,
    private router: Router
  ) {

  }

  /*
   * @function storeUserInfo sets the current logged in user information and the token
   * @param user
   * @param token
   */
  storeUserInfo(user, token) {
    if (!!user && !!token) {
      this.currentUser = user;
      this.token = token;
      this.httpService.updateAuthHeader(token);
      this.util.localStorageSet('token', token);
      this.util.localStorageSet('user', user);
    }
  }

  /*
   * @function login helps to login the user using the data object passed
   * @param loginData is used to get the user cred
   */
  async login(loginData) {
    return new Promise(async (resolve, reject) => {
      await this.httpService.simplePost('/auth/login', loginData).subscribe(
        (response) => {
          this.storeUserInfo(response['user'], response['user']['token']);
          if (localStorage.getItem('resetUrl')) {
            this.router.navigate([localStorage.getItem('resetUrl')]);

          } else {
            this.router.navigate(['/dashboard/default']);
          }
          resolve(true);
        },
        (error) => {
          reject(error);
        });
    });
  }

  /*
   * @function isUserLoggedIn used to check whether user is loggen in or not
   */
  isUserLoggedIn() {
    return !!this.currentUser;
  }

  /*
   * @function setUser verifies user token and sets the user from the local storage
   */
  setUser() {
    const user = this.util.localStorageGet('user');
    const token = this.util.localStorageGet('token');

    if (!!user && !!token) {
      // verify token from server
      this.httpService.simplePost('/auth/verify', { token }).subscribe();
      this.storeUserInfo(user, token);
    }
  }

  /*
   * @function checkAlreadyLoggedAndRedirect check if user is already logged if so redirect to dashboard
   */

  checkAlreadyLoggedAndRedirect() {
    if (this.isUserLoggedIn()) {
      this.router.navigate(['/dashboard/default']);
    }
  }

  /*
   * @function logout help to logout the user
   * and clear the local data
   */
  logout() {
    this.util.localStorageClear();
    this.httpService.updateAuthHeader(null);
    this.currentUser = null;
    this.token = null;
    this.router.navigate(['auth/login']);
  }

}
