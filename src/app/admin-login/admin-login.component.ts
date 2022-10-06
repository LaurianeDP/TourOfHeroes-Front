import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router"
import {Observable, Subscription} from "rxjs";
import {User} from "../user";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm:FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
  }
);

  constructor(private location: Location, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    console.log("in login function of admin component");
    let user:User= {
      "username": this.adminLoginForm.get('username')?.value,
      "password": this.adminLoginForm.get('password')?.value,
    }
    console.log(user);
    this.authService.login(user)
      .subscribe(() => console.log("login attempt"));

  }

  goBack() {
    this.location.back();
  }
}
