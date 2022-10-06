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

  constructor(private messageService: MessageService, private http: HttpClient, private heroService: HeroService) {
    this.userConnected = this.checkUserConnected();
  }

  private log(message: string) {
    this.messageService.add(`AuthentificationService: ${message}`);
  }

  public userConnected:boolean = false;

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  private loginUrl = 'http://localhost:8080/api/login_check';

  login(user:User) {
    return this.http.post<Token>(this.loginUrl, user, this.httpOptions).pipe(
      tap((jwtToken) => {
        // console.log("beginning request pipe");//TEST
        user.authenticatedStatus = true;
        this.setSession(jwtToken);
        this.userConnected = true;
        this.log('Logged in as Admin');
        // console.log("end request pipe");//TEST
      }),
      catchError(this.heroService.handleError<any>(`Login`))
    )
  }

  private setSession(JWTtoken:Token) {
    localStorage.setItem('id_token', JWTtoken.token);
  }

  logout() {
    console.log('in logout function');
    localStorage.removeItem('id_token');
    this.userConnected = false;
    this.log("Admin logged out");
  }

  checkUserConnected() {
    //!! next to a valid value returns true, invalid value returns false
    return !! localStorage.getItem("id_token");
  }
}
