import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Hero } from '../hero';
// import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';
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

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`found no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    //Add a step where hero is reformatted in json
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    //Add a step where hero is reformatted in json
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
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

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fecthed hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
    // const hero = HEROES.find(h => h.id === id)!;
    // this.messageService.add(`HeroService: ;
  }
}
