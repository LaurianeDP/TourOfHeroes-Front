import {Component, Input, OnInit} from '@angular/core';
import {Hero, HeroModel} from "../hero";
import {HeroesComponent} from "../heroes/heroes.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent extends HeroesComponent implements OnInit {
  heroForm = new FormGroup({
    heroName : new FormControl('Dr IQ', [Validators.required]),
    heroAlterEgo : new FormControl('Chuck Overstreet'),
    powers : new FormControl(['Really Smart', 'Super Flexible', 'Super Hot', 'Weather' +
    ' Changer'], [Validators.required])}
    );

  model = new Hero({
    id: 18,
    name: 'Dr IQ',
    power: 'Really Smart',
    alterEgo: 'Chuck Overstreet'
  });

  submitted = false;

  superconstructor() {
  }

  onSubmit() {
    this.submitted = true;
  }

  newHero(name: string, power: string, alterEgo: string) {
    let heroes: HeroModel[] = this.memoryDataService.createDb()?.heroes;
    let id = this.memoryDataService.genId(heroes);
    name = name.trim();
    alterEgo = alterEgo.trim();
    if (!name || !power) {
      return;
    }
    // let hero:Hero= new Hero({id:id, name:name, power:power, alterEgo:alterEgo});
    let hero: Hero = new Hero({id, name, power, alterEgo});
    this.add(hero);
  }

}
