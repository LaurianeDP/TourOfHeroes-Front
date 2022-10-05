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

  // private JWTtoken:string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NjQ5NzQ3OTYsImV4cCI6MTY2NDk3ODM5Niwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6Ikhlcm9BZG1pbiJ9.Fg6OleooIWEM842610xlXhJ0iwSdSDZ-AmkBwovwUAA0Cw093FNt0AH2bblaqL5LXMAoDaFgKCPPzbiTK3nE-MUfQccpXWeZ21ea9gMpfEadvQnGiwyw9pfZIsuyOnByyv6LmeM0fv7x4SYwX3MOZQDYvdX5owtE3o99VQorsUL-oDkG8dMti9zAgEylZsJcGcOpaHXhu0zTwfe_iy1Yh3vcWManTBpxGSAt9ZuVrswfNjdecbFsGltQcMyvJ9wvcOQCdt4F7qs8aNfnTiqarMF9vCKx-ov6gFhQBHPVgUuWmy-DrzazDMp1YWLRwV60LHYkFzEw7NwAaP5kujqywDV8KfyV9C1MQRNAGSn05F7OCdov1LS2SZvQIpoDrefRjN8At2t39a7kjc09RlTqeATWSF25nU8dWl-ihmMtMqtxolBoDuy8zVWF9LY9-1AyomL8euFdcxdxWsqyZsZpmU2inrhdbZTlv5mEUVIeGmqkD8g92lN23VyirY20mmSNjnXm61gGobWlVrXtje74v-ERHPbpOsYB9P70Nwyo3dW_7GG4uog8qSXSr-q535AYzU2xmPp_iSntroimFIMb0Pz8yKb2QUVdMsW7Pl6W41xEH-4_kgKcuAxYPwcZ7Dh2lskt4q37VN0D7lFyJXcsgi7LZi2rCiMTu0b8RykP5r0";
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
  public handleError<T>(operation = 'operation', result?: T) {
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
      tap(x =>  {
        this.log(x.length ? `found heroes matching "${term}"` : `found no heroes matching "${term}"`);
      }),
      catchError(this.handleError<HeroModel[]>('searchHeroes', []))
      );
  }
}
