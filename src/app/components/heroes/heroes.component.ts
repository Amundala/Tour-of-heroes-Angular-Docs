import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { UpperCasePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { TextToUpperCaseTransformPipe } from '../../pipes/text-to-upper-case-transform.pipe';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroServiceService } from '../../services/hero-service.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    TextToUpperCaseTransformPipe,
    UpperCasePipe,
    FormsModule,
    NgFor,
    NgIf,
    HeroDetailComponent,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent {
  heroes: Hero[] = [];
  header = 'My Heroes';
  constructor(private heroSerive: HeroServiceService) {}

  //--- Method to receive hero from service ----
  // getHeros(): void {
  //   this.heroes = this.heroSerive.getHeroes();
  // }
  //--- Now receiving Observable ---
  getHeros(): void {
    this.heroSerive.getHeroes().subscribe((result) => (this.heroes = result));
  }

  //--- get the data on ngOnInit not the constructor for best practice ---
  ngOnInit(): void {
    this.getHeros();
  }

  //--- Display a selected hero ---
  selectedHero?: Hero;
  onHeroSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
