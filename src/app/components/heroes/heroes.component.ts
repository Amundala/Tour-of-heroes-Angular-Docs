import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { UpperCasePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { TextToUpperCaseTransformPipe } from '../../pipes/text-to-upper-case-transform.pipe';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroServiceService } from '../../services/hero-service.service';
import { MessageService } from '../../services/message.service';
import { MessagesComponent } from '../messages/messages.component';
import { RouterLink } from '@angular/router';

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
    MessagesComponent,
    RouterLink,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent {
  heroes: Hero[] = [];
  //selectHero?: Hero;
  header = 'My Heroes';
  constructor(
    private heroSerive: HeroServiceService,
    private messageService: MessageService
  ) {}

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
  // onSelect(hero: Hero) {
  //   this.selectHero = hero;
  //   this.messageService.add(`Selected Hero: Hero Id = ${hero.id}`);
  // }

  //--- Adding A Hero ---
  addHero(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroSerive.addHero({ name } as Hero).subscribe((hero) => {
      this.heroes.push(hero);
    });
  }
}
