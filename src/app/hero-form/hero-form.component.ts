import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Hero, HeroModel} from "../hero";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeroService} from "../services/hero.service";
import {Location} from "@angular/common";
import {PowerModel} from "../power";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  encapsulation:ViewEncapsulation.None // OBLIGATOIRE
})
export class HeroFormComponent implements OnInit, OnDestroy {

  constructor(protected heroService:HeroService) {

  }
  public hero?:HeroModel;
  public heroPower?: PowerModel;

  powers:  PowerModel[] = [];

  heroForm!: FormGroup;

  submitted = false;

  location?:Location;

  secret = new FormControl("It's a secret!");
  secretClass:string = "fw-bold text-danger";

  ngOnInit(): void {
    this.getHeroForm();
    this.heroService.getPowers()
      .subscribe((powers) => {
        this.powers = powers
      });
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  formChangesSubscription?:Subscription;

  onSubmit() {
    this.submitted = true;
    let heroName = this.heroForm.get('heroName')?.value;
    let alterEgo = this.heroForm.get('heroAlterEgo')?.value;
    let power = this.powers.find(({id}) => this.heroForm.get('heroPower')?.value === id);
    this.heroPower = power;
    this.newHero(heroName!, power!, alterEgo!);
  }

  isSecret(): boolean {
    return this.heroForm.get('heroAlterEgo')?.value?.length === 0;
  }

  changeSecret() {
    if(this.secret.value === "It's a secret!") {
      this.secret.setValue("But not really");
      this.secretClass = "text-dark";
    }
    else {
      this.secret.setValue("It's a secret!");
      this.secretClass = "fw-bold text-danger";
    }
  }

  getHeroAlterEgo():string|null|void {
    return this.heroForm.get('heroAlterEgo')?.value;
  }

  newHero(name: string, power: PowerModel, alterEgo?: string) {
    name = name.trim();
    alterEgo = alterEgo?.trim();
    if (!name || !power) {
      return;
    }
    this.heroService.addHero({ name, power, alterEgo}).subscribe((newHero) => {
      console.log('hero is ' + newHero); //TEST
      this.hero = newHero;
    } );
    // this.heroService.addHero(this.hero).subscribe(function () {} );
  }

  getHeroForm() {
    this.formChangesSubscription?.unsubscribe();
    this.heroForm = new FormGroup({
        heroName: new FormControl('', [Validators.required]),
        heroAlterEgo: new FormControl(''),
        heroPower: new FormControl(this.heroPower, [Validators.required])
      }
    );
    this.submitted = false;
  }
}
