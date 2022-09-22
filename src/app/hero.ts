export interface HeroModel {
  id: number;
  name: string;
  power: string;
  alterEgo?: string;
}

export class Hero {
  public id?: number;
  public name?: string;
  public power?: string;
  public alterEgo?: string|null;

  constructor(model:HeroModel) {
      this.id = model.id;
      this.name = model.name;
      this.power = model.power;
      this.alterEgo = model?.alterEgo ?? null;
      // this.alterEgo = model?.alterEgo || null;
      // this.alterEgo = model?.alterEgo === null ? null : model.alterEgo;
  }

  // constructor(id: number, name: string, power: string, alterEgo?: string) {
  //   this.id = id;
  //   this.name = name;
  //   this.power = power;
  //   this.alterEgo = alterEgo;
  // }
}
