import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string
  private isAuth: boolean = false;
  private authStatusListener = new Subject<{ isAuth: boolean }>;
  private userLogin: string = ''
  private adminID: string = ''

  constructor(private http: HttpClient, private router: Router, private cookies: CookieService, private snackBar: MatSnackBar) { }

  getIsAuth() {
    return this.isAuth;
  }

  getToken() {
    return this.token;
  }

  login(login: string, password: string) {
    const authData = { login: login, password: password };

    this.http.post<{ token: string, message: string, adminID: number }>('http://localhost:3000/api/auth/', authData).subscribe({
      next: response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuth = true;
          this.authStatusListener.next({ isAuth: true });
          this.userLogin = login;
          this.adminID = response.adminID.toString();
          this.router.navigate(['/admin']);
          this.setCookies();
        }
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 })
      }
    })
  }

  logout() {
    this.authStatusListener.next({ isAuth: false });
    this.isAuth = false;
    this.token = '';
    this.userLogin = '';
    this.adminID = '';
    this.clearCookies();
    this.router.navigate(['/admin/login']);
  }

  private setCookies() {
    this.cookies.set('SESSION_TOKEN', this.token, 1, '/admin');
    this.cookies.set('USER_LOGIN', this.userLogin, 1, '/admin');
    this.cookies.set('USER_ID', this.adminID, 1, '/admin');
  }

  private clearCookies() {  
    this.cookies.deleteAll('/admin');
  }

  private getCookiesData() {
    const token = this.cookies.get('SESSION_TOKEN');
    const userLogin = this.cookies.get('USER_LOGIN');
    const adminID = this.cookies.get('USER_ID');

    if(!token) {
        return;
    }

    return {
        token: token,
        userLogin: userLogin,
        adminID: adminID
    }
  }

  autoAuth() {
    const authInfo = this.getCookiesData();
    if (!authInfo) {
        return;
    }

    this.token = authInfo.token;
    this.userLogin = authInfo.userLogin;
    this.adminID = authInfo.adminID;
    this.isAuth = true;
    this.authStatusListener.next({ isAuth: true });
  }

  changePassword(actualPass: string, newPass: string) {
    const changeData = {
      actualPass: actualPass,
      newPass: newPass,
      adminID: Number(this.adminID)
    }

    this.http.patch<{ message: string }>('http://localhost:3000/api/auth/', changeData).subscribe({
      next: editedAdmin => {
        this.snackBar.open(editedAdmin.message, 'OK', { duration: 3000 })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 })
      }
    })
  }

  addNewAdmin(login: string, password: string) {

    const adminData = {
      login: login,
      password: password
    }

    this.http.post<{ message: string }>('http://localhost:3000/api/auth/newAdmin/', adminData).subscribe({
      next: editedAdmin => {
        this.snackBar.open(editedAdmin.message, 'OK', { duration: 3000 })
      },
      error: error => {
        this.snackBar.open(error.error.message, 'OK', { duration: 3000 })
      }
    })
  }
}
