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
}
