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

  private checkUserConnected = new Subject<boolean>();

  constructor(private authService:AuthService) {
  }

  ngOnInit() {
    this.checkUserConnected.pipe(
      debounceTime(200),
      distinctUntilChanged(),
    ).subscribe(
      () => {
        this.userConnected = this.isUserConnected();
        console.log("in subscribe of check pipe");
      }
    );
  }

  logout() {
    this.authService.logout();
  }


  isUserConnected() {
    return this.authService.checkUserConnected()
  }
}
