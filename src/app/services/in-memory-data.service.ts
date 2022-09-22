import {Injectable} from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Hero, HeroModel} from '../hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      heroes: [
        {id: 12, name: "Dr. Nice", power: "Super friendly"},
        {id: 13, name: "Bombasto", power: "Super explosive"},
        {id: 14, name: "Celeritas", power: "Super fast"},
        {id: 15, name: "Magneta", power: "Super magnetic"},
        {id: 16, name: "RubberMan", power: "Super strechy"},
        {id: 17, name: "Dynama", power: "Super dynamite"},
        {id: 18, name: "Dr. IQ", power: "Super smart"},
        {id: 19, name: "Magma", power: "Super hot"},
        {id: 20, name: "Tornado", power: "Super swirly"}
      ]

    };
  }

  genId(heroes: HeroModel[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }


  constructor() {
  }
}
