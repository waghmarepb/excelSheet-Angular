import { Injectable } from '@angular/core';
import { UtilsService } from 'src/app/_shared/services/utils.service';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        public utilsService: UtilsService,
        public authService: AuthService
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const token: string = localStorage.getItem('token');

        // if (token) {
        //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        // }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // }

        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        return next.handle(request)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // console.log('event--->>>', event);
                        // this.errorDialogService.openDialog(event);
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    let data: any;
                    data = {
                        message: error && error.error && error.error.message ? error.error.message : '',
                        status: error.status
                    };
                    console.log('error', error);
                    console.log('error', error.error);
                    console.log('error', error.error.message);

                    this.utilsService.errorToaster(data.status, data.message);
                    if (!!error.error['tokenExpired']) {
                        this.authService.logout();
                    }
                    return throwError(error);
                }));
    }
}
