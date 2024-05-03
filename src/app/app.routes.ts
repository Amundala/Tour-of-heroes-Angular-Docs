import { Routes } from '@angular/router';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HeroesComponent,
    title: 'Heroes Home',
  },
  {
    path: 'details',
    component: HeroDetailComponent,
    title: 'Hero Details',
  },
];
