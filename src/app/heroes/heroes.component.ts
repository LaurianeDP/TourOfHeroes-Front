import { Component, OnInit } from '@angular/core';

import { HeroService } from '../services/hero.service';
import {Hero} from "../hero";
import {InMemoryDataService} from "../services/in-memory-data.service";
import {Location} from "@angular/common";

// import { MessageService } from '../message.service';

// interface SuperHero {
//   porp1?:string;
// }
//
// type NumberOrNull = number | null | 'aze';
//
// const toto: NumberOrNull = 'aze';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    heroes: Hero[] = [];
    //? indique que l'attribut peut être initialisé en ayant une valeure nulle
    // selectedHero?: Hero;

  constructor(protected heroService: HeroService, protected memoryDataService: InMemoryDataService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  // add(hero: Hero): void {
  //   if (!hero) {return;}
  //   this.heroService.addHero(hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //
  //     });
  // }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id!).subscribe();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe((heroes) => this.heroes = heroes);
  }

}
