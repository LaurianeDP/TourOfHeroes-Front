import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpHeaders, HttpHeaderResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("in http interceptor"); //Test
    // console.log(request.method); //TEST

    //do not send JWT token on get requests, allowed for all users
    if (request.method == 'GET') {
      return next.handle(request);
    }

    //Only send headers with token to trusted apis
    const uri = new URL(request.url);
    if (uri.hostname !== 'localhost') {
      console.log("In false condition of trusted hostname"); //TEST
      return next.handle(request);
    }

    //If it exists, sends the token
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      request = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + idToken)
      });
    }
    return next.handle(request).pipe(
      tap((httpEvent) => {
        console.log(httpEvent);

      }),
      catchError((error) => {
        // console.log(error.status); //TEST
        if(error.status == 401){
          this.auth.logout();
        }
        return throwError(error);
      })
    );
  }
}
