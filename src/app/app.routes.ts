import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent,
    title: 'Heroes Home',
  },
  {
    path: 'details',
    component: HeroDetailComponent,
    title: 'Hero Details',
  },
];
