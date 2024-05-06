import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../interfaces/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroServiceService {
  constructor(private messageService: MessageService) {}

  //--- method to return our data ---
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  //--- using obeservable ---
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add("Holala! Your awaited hero's here");
    return heroes;
  }

  //--- get a single hero fopr hero details component ----
  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((heroId) => heroId.id === id)!;
    this.messageService.add(`Fetched Hero Id: ${id}`);
    return of(hero);
  }
}
