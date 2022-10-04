import { Component, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { HeroService } from '../services/hero.service';
import {Hero} from "../hero";
// import {InMemoryDataService} from "../services/in-memory-data.service";
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
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
    heroes: Hero[] = [];
    allHeroes: Hero[] = [];
    //? indique que l'attribut peut être initialisé en ayant une valeure nulle
    // selectedHero?: Hero;
  public currentPage:number = 1;
  public nextButtonActive = true;
  public previousButtonActive = false;

  constructor(protected heroService: HeroService) { }

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

  goToNextPage() {
    this.currentPage = this.currentPage + 1;
    this.heroService.getHeroes(this.currentPage)
    .subscribe((heroes) => this.heroes = heroes);
    this.previousButtonActive = true;
  }

  goToPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.heroService.getHeroes(this.currentPage)
    .subscribe((heroes) => this.heroes = heroes);
    this.nextButtonActive = true;
  }

  private getHeroes(): void {
    this.heroService.getHeroes(this.currentPage)
      .subscribe((heroes) => this.heroes = heroes);
  }


  private getAllHeroes() {
    this.heroService.getAllHeroes()
      .subscribe((heroes) => this.allHeroes = heroes);
  }
}
