import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Hero } from '../../interfaces/hero';
import { HeroServiceService } from '../../services/hero-service.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, RouterLink, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  //--- Our Variable initialization empty array ---
  heroes: Hero[] = [];

  //--- passsing our service to the constutor ---
  constructor(private heroService: HeroServiceService) {}

  //--- load of getheroes fx on component init ---
  ngOnInit(): void {
    this.getHeroes();
  }

  //--- getting heroes from the service ---
  getHeroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((result) => (this.heroes = result.slice(1, 5)));
  }
}
