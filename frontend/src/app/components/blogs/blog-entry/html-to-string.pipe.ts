import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlToString',
  standalone: true
})
export class HtmlToStringPipe implements PipeTransform {

  transform(value: string): string {
    return new DOMParser().parseFromString(value, 'text/html').body.outerText;
  }

}
