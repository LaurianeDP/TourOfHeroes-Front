import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import {Hero, HeroModel} from '../hero';
// import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";
import {PowerModel} from "../power";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:8080/api/heroes';
  private allHeroesUrl = 'http://localhost:8080/api/heroesAll';
  private heroCreationUrl = 'http://localhost:8080/api/hero';
  private heroSearchUrl = 'http://localhost:8080/api/heroes_search';
  private powersUrl = 'http://localhost:8080/api/powers';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  //T est ici un paramètre pour définir le type attendu par le rapport d'erreur
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);

      this.log(`${operation} failed: ${error.message}` );

      return of(result as T);
    };
  }

  addHero(heroModel: Partial<HeroModel>): Observable<HeroModel> {
    console.log(heroModel);
    return this.http.post<HeroModel>(this.heroCreationUrl, heroModel, this.httpOptions).pipe(
      tap((newHero: HeroModel) => this.log(`added hero`)),
      catchError(this.handleError<HeroModel>('addHero'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    let heroModel = hero.objectToModel();
    return this.http.put(this.heroesUrl+'/'+heroModel.id, heroModel, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  deleteHero(id: number): Observable<Hero>  {
    const url= `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  getHeroes(page = 1): Observable<Hero[]> {
    return this.http.get<HeroModel[]>(this.heroesUrl+'?page='+page)
      .pipe(
        tap(_ => this.log('fetched heroes page ' + page)),
        map((heroModels) => {
          let heroes: Hero[] = [];
          for (const heroModel of heroModels) {
            heroes.push(new Hero(heroModel));
          }
          return heroes;
          // return heroModels.map((model) => new Hero(model));
        } ),
        catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<HeroModel>(url)
      .pipe(
        tap(_ => this.log(`fecthed hero id=${id}`)),
        map((heroModel) => new Hero(heroModel) ),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    // const hero = HEROES.find(h => h.id === id)!;
    // this.messageService.add(`HeroService: ;
  }

  getPowers(): Observable<PowerModel[]> {
    return this.http.get<PowerModel[]>(this.powersUrl)
      .pipe(
        tap(_ => this.log('fetched powers')),
        catchError(this.handleError<PowerModel[]>('getPowers', []))
      );
  }

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<HeroModel[]>(this.allHeroesUrl)
      .pipe(
        tap(_ => this.log('fetched all heroes')),
        map((heroModels) => heroModels.map((model) => new Hero(model))),
        catchError(this.handleError<Hero[]>('getAllHeroes', []))
      );
  }

  getSearchedHeroes(term: string):Observable<HeroModel[]> {
    return this.http.get<HeroModel[]>(this.heroCreationUrl).pipe(
      tap(_ => this.log(`searched hero`)),
      catchError(this.handleError<HeroModel[]>('searchHero'))
    );
  }

  searchHeroes(term: string): Observable<HeroModel[]> {
    term = term.trim();
    if (!term) {
      return of([]);
    }
    return this.http.get<HeroModel[]>(`${this.heroSearchUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`found no heroes matching "${term}"`)),
      catchError(this.handleError<HeroModel[]>('searchHeroes', []))
      );
  }
}
