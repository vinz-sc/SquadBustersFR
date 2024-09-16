import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineToParagraph',
})
export class NewlineToParagraphPipe implements PipeTransform {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  transform(value: string, ..._: unknown[]): unknown {
    if (!value) {
      return '';
    }

    // Split the string by \r\n and filter out empty lines
    const lines = value.split('\r\n').filter((line) => line.trim() !== '');

    // Wrap each line in <p> tags and join them
    return lines
      .map((line, index) => {
        if (index === lines.length - 1) {
          return `<p class="mb-0">${line}</p>`;
        } else {
          return `<p>${line}</p>`;
        }
      })
      .join('');
  }
}
