import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("in http interceptor"); //Test
    const idToken = localStorage.getItem("id_token");
    if(idToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + idToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(request);
    }
  }
}
