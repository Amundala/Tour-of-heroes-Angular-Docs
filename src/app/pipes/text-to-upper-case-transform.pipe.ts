import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textToUpperCaseTransform',
  standalone: true,
})
export class TextToUpperCaseTransformPipe implements PipeTransform {
  //--- Just Trying my custom pipe creation ---
  transform(value: string): string {
    if (!value) {
      return value;
    }
    if (typeof value !== 'string') {
      return 'Value not A String';
    }
    return value.toUpperCase();
  }
}
