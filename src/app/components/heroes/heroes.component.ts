import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { UpperCasePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { HEROES } from '../../mock-heroes';
import { TextToUpperCaseTransformPipe } from '../../pipes/text-to-upper-case-transform.pipe';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';

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
  heroes = HEROES;
  header = 'My Heroes';

  //--- Display a selected hero ---
  selectedHero?: Hero;
  onHeroSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
