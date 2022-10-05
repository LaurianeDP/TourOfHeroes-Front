import {Component, OnInit, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

import {Hero} from "../hero";
import {HeroService} from "../services/hero.service";
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  heroes$!: Observable<Hero[]>;

  heroes: Hero[] = [];

  displayedColumns: string[] = ['Id', 'name', 'alterEgo', 'power'];
  dataSource = new MatTableDataSource(this.heroes);

  // @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  }

  private searchTerms = new Subject<string>();
  searchDone: boolean = false;

  constructor(private heroService: HeroService) {
  }

  ngOnDestroy() {
    this.searchTerms.complete();
  }

  search(term: string): void {
    console.log("test", this.heroes$);
    this.searchTerms.next(term);
  }

  ngOnInit(): void { //Tous ces éléments ont pour but de réduire la quantité de requête http, même lors de plusieurs
    // recherches consécutives
    // this.searchTerms.pipe(
    //   //Attends 300ms à chaque nouvelle entrée avant de relancer la recherche
    //   debounceTime(300),
    //   //Si le contenu n'a pas changé, ne relance pas la recherche
    //   distinctUntilChanged(),
    //   //La liste affichée est modifiée si le terme recherché change
    //   switchMap((term: string) => this.heroService.searchHeroes(term))
    // ).subscribe((heroes) => {
    //   console.log(heroes);
    // });

    const tasks: [any, any, any] = [
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    ];
    const pipe = this.searchTerms.pipe(...tasks);
    const result: Subscription = pipe.subscribe((heroes) => {
      console.log(heroes);
      this.searchDone = true;
      this.heroes = heroes as Hero[];
    });
    // result.unsubscribe();
  }

}
