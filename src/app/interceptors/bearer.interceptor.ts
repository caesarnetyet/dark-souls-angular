import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';


@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    const authToken = localStorage.getItem('token');
    if (authToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      })
      return next.handle(authRequest)
    }
    const setAcceptType = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    })
    return next.handle(setAcceptType)
  }
}
