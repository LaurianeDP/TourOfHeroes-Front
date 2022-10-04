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
    console.log(this.hero); //TEST
  }

  ngOnDestroy(): void {
    this.formChangesSubscription?.unsubscribe();
  }

  formChangesSubscription?:Subscription;

  onSubmit() {
    this.submitted = true;
    let heroName = this.heroForm.get('heroName')?.value;
    let power = this.powers.find(({id}) => this.heroForm.get('heroPower')?.value === id);
    let alterEgo = this.heroForm.get('heroAlterEgo')?.value;
    this.newHero(heroName!, power!, alterEgo!);
    console.log('submitted form');
  }

  isSecret(): boolean {
    return this.heroForm.get('heroAlterEgo')?.value?.length === 0;
    // if(this.heroForm.get('heroAlterEgo')?.value?.length != 0) {
    //   return false
    // }
    // return true;
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
      console.log(this.hero); //TEST
    } );
    // this.heroService.addHero(this.hero).subscribe(function () {} );
  }

  getHeroForm() {
    this.formChangesSubscription?.unsubscribe();
    this.heroForm = new FormGroup({
        heroName: new FormControl(this.hero?.name, [Validators.required]),
        heroAlterEgo: new FormControl(this.hero?.alterEgo),
        heroPower: new FormControl(this.hero?.power?.id, [Validators.required])
      }
    );
  }
}
