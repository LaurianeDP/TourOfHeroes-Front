import { Component, Input, OnInit } from '@angular/core';
import { Hero, HeroModel } from "../hero";
import { HeroesComponent } from "../heroes/heroes.component";
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { HeroService } from "../services/hero.service";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent extends HeroesComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Super Hot', 'Weather' +
  ' Changer']

  heroForm = new FormGroup({
      heroName: new FormControl('', [Validators.required]),
      heroAlterEgo: new FormControl(''),
      heroPower: new FormControl('', [Validators.required])
    }
  );

  submitted = false;

  superconstructor() {
  }

  onSubmit(name:string, power:string, alterEgo?:string) {
    this.submitted = true;
    this.newHero(name, power, alterEgo);
  }

  newHero(name: string, power: string, alterEgo?: string) {
    let heroes: HeroModel[] = this.memoryDataService.createDb()?.heroes;
    let id = this.memoryDataService.genId(heroes);
    name = name.trim();
    alterEgo = alterEgo?.trim();
    if (!name || !power) {
      return;
    }
    // let hero:Hero= new Hero({id:id, name:name, power:power, alterEgo:alterEgo});
    let hero: Hero = new Hero({id, name, power, alterEgo});
    this.add(hero);
  }

}
