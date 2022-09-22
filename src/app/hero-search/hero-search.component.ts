import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import {Hero} from "../hero";
import {HeroService} from "../services/hero.service";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void { //Tous ces éléments ont pour but de réduire la quantité de requête http, même lors de plusieurs
    // recherches consécutives
    this.heroes$ = this.searchTerms.pipe(
      //Attends 300ms à chaque nouvelle entrée avant de relancer la recherche
      debounceTime(300),
      //Si le contenu n'a pas changé, ne relance pas la recherche
      distinctUntilChanged(),
      //La liste affichée est modifiée si le terme recherché change
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }

}
