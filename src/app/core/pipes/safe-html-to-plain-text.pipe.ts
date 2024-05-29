import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeHtmlToPlainText',
})
export class SafeHtmlToPlainTextPipe implements PipeTransform {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    }

    // Create a new DOM parser to parse the HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(value as string, 'text/html');

    // Extract the text content from the parsed HTML
    return doc.body.textContent || '';
  }
}
