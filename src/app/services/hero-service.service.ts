import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../interfaces/hero';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroServiceService {
  constructor() {}

  //--- method to return our data ---
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  //--- using obeservable ---
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
}
