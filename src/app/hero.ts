import {HeroService} from "./services/hero.service";

export interface HeroModel {
  id: number;
  name: string;
  power: string;
  alterEgo?: string | null;
}

export class Hero {
  public id?: number|null;
  public name?: string;
  public power?: string;
  public alterEgo?: string | null;

  constructor(model:Partial<HeroModel>) {
      this.id = model.id ?? null;
      this.name = model.name;
      this.power = model.power;
      this.alterEgo = model?.alterEgo ?? null;
      // this.alterEgo = model?.alterEgo || null;
      // this.alterEgo = model?.alterEgo === null ? null : model.alterEgo;
  }

  //Méthode pour transformer objet en Modele
  objectToModel() {
    let heroModel:HeroModel = {
      id : this.id!,
      name : this.name!,
      power : this.power!,
      alterEgo : this.alterEgo
    };
    return heroModel;
  }


  // constructor(id: number, name: string, power: string, alterEgo?: string) {
  //   this.id = id;
  //   this.name = name;
  //   this.power = power;
  //   this.alterEgo = alterEgo;
  // }
}
