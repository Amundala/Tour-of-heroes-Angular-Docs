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

  //--- using http client & extend it with pipe to catch error & tap to ----
  //---- add other effect wihout changing the emmited observable values---

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched Heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  //--- get a single hero fopr hero details component ----
  // getHero(id: number): Observable<Hero> {
  //   const hero = HEROES.find((heroId) => heroId.id === id)!;
  //   this.messageService.add(`Fetched Hero Id: ${id}`);
  //   return of(hero);
  // }

  // get a single hero using http ---
  getHero(id: number): Observable<Hero> {
    //--- end point ---
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`Fetched hero Id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero with Id ${id}`))
    );
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
  // --- Defining the Headers ----
  httoOptions = {
    headers: new HttpHeaders({
      Content_Types: 'application/json',
    }),
  };
  //--- updating the hero ----
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httoOptions).pipe(
      tap((_) => this.log(`Update hero Id: ${hero.id}`)),
      catchError(this.handleError<any>('Updated'))
    );
  }

  //--- Adding a new hero ----
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httoOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('Add hero'))
    );
  }

  //---- Deleting a Hero ----
  deletehero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httoOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('Deelte hero'))
    );
  }

  //--- searching functionality ---
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`Foudn Heroes Matching ${term}`)
          : this.log(`No Heroes Matching ${term}`)
      ),
      catchError(this.handleError<Hero[]>(`search Heroes`, []))
    );
  }
}
