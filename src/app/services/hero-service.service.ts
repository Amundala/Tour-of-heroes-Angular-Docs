import { Injectable } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../interfaces/hero';
import { catchError, map, tap, Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroServiceService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  //--- End point ----
  private heroesUrl = 'api/heroes';

  //--- since the message service is called frequently we gonna put it in private log() ---
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  //--- method to return our data ---
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  //--- using obeservable and of() ---
  // getHeroes(): Observable<Hero[]> {
  //   const heroes = of(HEROES);
  //   this.messageService.add("Holala! Your awaited hero's here");
  //   return heroes;
  // }

  //--- using http client & extend it with pipe to catch error---
  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  //--- get a single hero fopr hero details component ----
  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find((heroId) => heroId.id === id)!;
    this.messageService.add(`Fetched Hero Id: ${id}`);
    return of(hero);
  }

  //--- Handle error method ---
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //--- send the error to loggin infracture ----
      console.error(error);
      this.log(`${operation}: ${error.message}`);

      //--- let the app keep running by returning emplty result ---
      return of(result as T);
    };
  }
}
