import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Hero} from "../hero";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HeroService} from "../services/hero.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
  encapsulation:ViewEncapsulation.None // OBLIGATOIRE
})
export class HeroFormComponent implements OnInit, OnDestroy {

  constructor(protected heroService:HeroService) {

  }
  hero?:Hero;

  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather' +
  ' Changer']

  heroForm = new FormGroup({
      heroName: new FormControl('', [Validators.required]),
      heroAlterEgo: new FormControl(''),
      heroPower: new FormControl('', [Validators.required])
    }
  );

  submitted = false;

  location?:Location;

  secret = new FormControl("It's a secret!");
  secretClass:string = "fw-bold text-danger";

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }



  onSubmit() {
    this.submitted = true;
    let heroName = this.heroForm.get('heroName')?.value;
    let power = this.heroForm.get('heroPower')?.value;
    let alterEgo = this.heroForm.get('heroAlterEgo')?.value;
    this.newHero(heroName!, power!, alterEgo!);
  }

  isSecret(): boolean {
    return this.heroForm.get('heroAlterEgo')?.value?.length === 0;
    // if(this.heroForm.get('heroAlterEgo')?.value?.length != 0) {
    //   return false
    // }
    // return true;
  }

  changeSecret($event:Event) {
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

  newHero(name: string, power: string, alterEgo?: string) {
    name = name.trim();
    alterEgo = alterEgo?.trim();
    if (!name || !power) {
      return;
    }
    // let hero:Hero= new Hero({id:id, name:name, power:power, alterEgo:alterEgo});
    this.hero = new Hero({ name, power, alterEgo});
    console.log(this.hero); //TEST
    this.heroService.addHero(this.hero).subscribe((newHero) => {
      this.hero = new Hero(newHero);
    } );
    // this.heroService.addHero(this.hero).subscribe(function () {} );
  }

  resetForm() {
    this.heroForm = new FormGroup({
      heroName: new FormControl('', [Validators.required]),
      heroAlterEgo: new FormControl(''),
      heroPower: new FormControl('', [Validators.required])
    });
  }

}
