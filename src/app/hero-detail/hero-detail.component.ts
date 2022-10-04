import {Component, OnDestroy, OnInit} from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {HeroService} from "../services/hero.service";
import {Hero} from '../hero';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {PowerModel} from "../power";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {

  public hero?: Hero;

  powers:  PowerModel[] = [];

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
    //Loads all powers to fill select options
    this.heroService.getPowers()
      .subscribe((powers) => {
        this.powers = powers
      });
  }

  formChangesSubscription?:Subscription;

  getHeroForm() {
    this.formChangesSubscription?.unsubscribe();
    this.heroForm = new FormGroup({
        heroName: new FormControl(this.hero?.name, [Validators.required]),
        heroAlterEgo: new FormControl(this.hero?.alterEgo),
        heroPower: new FormControl(this.hero?.power?.id, [Validators.required])
      }
    );
    console.log(this.heroForm.value);
    this.formChangesSubscription = this.heroForm.valueChanges.subscribe((result) => console.log('test', result));
    console.log(this.hero?.power);
  }

  getHero(): Observable<Hero> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.heroService.getHero(id);
  }

  save(): void {
    this.hero!.name=this.heroForm.get('heroName')?.value;
    this.hero!.alterEgo=this.heroForm.get('heroAlterEgo')?.value;
    //change id value to interface PowerModel
    this.hero!.power = this.powers.find(({id}) => this.heroForm.get('heroPower')?.value === id);
    console.log(this.hero);
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => console.log("hero udpated"));
    }
  }

  goBack(): void {
    this.location.back();
  }
}
