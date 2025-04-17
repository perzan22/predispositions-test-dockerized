import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private snackBar: MatSnackBar) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authorization','Bearer ' + authToken) 
        });

        return next.handle(authRequest).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.logout();
                    this.snackBar.open('Nieprawidłowe dane logowania', "OK", { duration: 3000 });
                }
                if (error.status === 403) {
                    this.authService.logout();
                    this.snackBar.open('Sesja wygasła, zaloguj się ponownie!', "OK", { duration: 3000 });
                }
                if (error.status === 404) {
                    this.authService.logout();
                    this.snackBar.open('Nie znaleziono użytkownika!', "OK", { duration: 3000 });
                }
                return throwError(() => new Error(error.error));
            })
        );
    }
}