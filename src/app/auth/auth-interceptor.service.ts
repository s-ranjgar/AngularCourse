import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { take, exhaustMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private store: Store<fromApp.AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(take(1),
        map(authState=>{
            return authState.user;
        }),
        exhaustMap(user => {
            if (!user) {
                return next.handle(req);
            }
            const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
            return next.handle(modifiedReq);

        })
        );
    }

}