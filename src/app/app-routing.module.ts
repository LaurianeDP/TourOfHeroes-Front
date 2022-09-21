import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeroDetailComponent } from "./hero-detail/hero-detail.component";
import { HeroFormComponent} from "./hero-form/hero-form.component";

const routes: Routes = [
  //Dans Angular, une route contient deux éléments, le chemin: qui correspond à ce qui se trouve dans l'URL et le
  // composent, qui indique quel composant doit être instancié par le router lorsque l'utilisateur active cette route
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  //la syntaxe : indique que l'élément est un placeholder pour un paramètre
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'sign-up', component: HeroFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
