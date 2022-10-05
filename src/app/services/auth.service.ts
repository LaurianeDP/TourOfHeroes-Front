import { Injectable } from '@angular/core';
import {Token, User} from "../user";
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import {Hero} from "../hero";
import {HeroService} from "./hero.service";
import {PowerModel} from "../power";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private messageService: MessageService, private http: HttpClient, private heroService: HeroService) { }

  private log(message: string) {
    this.messageService.add(`AuthentificationService: ${message}`);
  }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  private loginUrl = 'http://localhost:8080/api/login_check';

  login(user:User) {
    console.log("in login function of admin service");

    return this.http.post<Token>(this.loginUrl, user, this.httpOptions).pipe(
      tap((jwtToken) => {
        console.log("beginning request pipe");
        user.authenticatedStatus = true;
        this.setSession(jwtToken);
        this.log('Logged in as Admin');
        console.log("end request pipe");
      }),
      catchError(this.heroService.handleError<any>(`Login`))
    )
  }

  private setSession(JWTtoken:Token) {
    localStorage.setItem('id_token', JWTtoken.token);
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  checkUserConnected() {
    const idToken = localStorage.getItem("id_token");
    if(idToken) {

    }
  }
}
