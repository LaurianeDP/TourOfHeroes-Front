import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {HeroService} from "../services/hero.service";
import {Hero} from '../hero';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  public hero?: Hero;

  powers = ['Really Smart', 'Super friendly', 'Super Flexible', 'Super Hot', 'Weather' +
  ' Changer', 'Super explosive']

  heroForm!:FormGroup;

  submitted = false;

  constructor(private route: ActivatedRoute, private heroService: HeroService, private location: Location) {
  }
  ngOnDestroy() {
    this.formChangesSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getHeroForm();
    this.getHero()
      .subscribe(hero => {
      this.hero = hero;
      this.getHeroForm();
      });
    console.log(this.hero);
    // this.loadHero();
  }

  formChangesSubscription?:Subscription;

  getHeroForm() {
    this.formChangesSubscription?.unsubscribe();
    this.heroForm = new FormGroup({
        heroName: new FormControl(this.hero?.name, [Validators.required]),
        heroAlterEgo: new FormControl(this.hero?.alterEgo),
        heroPower: new FormControl(this.hero?.power, [Validators.required])
      }
    );
    this.formChangesSubscription = this.heroForm.valueChanges.subscribe((result) => console.log('test', result));
  }

  getHero(): Observable<Hero> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.heroService.getHero(id);
  }

  save(): void {
    this.hero!.name=this.heroForm.get('heroName')?.value;
    this.hero!.alterEgo=this.heroForm.get('heroAlterEgo')?.value;
    this.hero!.power=this.heroForm.get('heroPower')?.value;
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => console.log("hero udpated"));
    }
  }

  goBack(): void {
    this.location.back();
  }
}
