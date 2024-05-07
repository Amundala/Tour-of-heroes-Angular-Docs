import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { TextToUpperCaseTransformPipe } from '../../pipes/text-to-upper-case-transform.pipe';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroServiceService } from '../../services/hero-service.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [TextToUpperCaseTransformPipe, NgIf, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
})
export class HeroDetailComponent {
  constructor(
    private heroService: HeroServiceService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  hero: Hero | undefined;

  ngOnInit(): void {
    this.getHero();
  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
