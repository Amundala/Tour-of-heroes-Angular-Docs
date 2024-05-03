import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { TextToUpperCaseTransformPipe } from '../../pipes/text-to-upper-case-transform.pipe';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [TextToUpperCaseTransformPipe, NgIf, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
}
