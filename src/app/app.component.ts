import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {BehaviorSubject, debounce, Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'Tour of Hero';

  userConnected?:boolean;

  constructor(private authService:AuthService) {
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
  }


  get isUserConnected() {
    return this.authService.userConnected;
  }
}
