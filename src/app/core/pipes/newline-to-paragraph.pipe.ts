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
    return lines.map((line) => `<p>${line}</p>`).join('');
  }
}
