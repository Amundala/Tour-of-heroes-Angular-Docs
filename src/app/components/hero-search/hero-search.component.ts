import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero';
import { HeroServiceService } from '../../services/hero-service.service';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css',
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerm = new Subject<string>();

  constructor(private heroService: HeroServiceService) {}

  //--- push a search term into observable stream ---
  search(term: string): void {
    this.searchTerm.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerm.pipe(
      //--- wait 300ms  after each keystroke before considering the term---
      debounceTime(300),

      //--- ignore the new term if same as prvious,
      //--- ensures that a request is sent only if the filter text changed. ----
      distinctUntilChanged(),

      //--- switch to new search observable each time the term changes ---
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
