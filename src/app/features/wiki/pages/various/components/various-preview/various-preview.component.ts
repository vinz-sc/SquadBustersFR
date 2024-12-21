import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-various-preview',
  templateUrl: './various-preview.component.html',
  styleUrl: './various-preview.component.scss',
})
export class VariousPreviewComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public backgroundImage: string = '';

  @Input()
  public link: string = '';

  @Input()
  public name: string = '';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get backgroundImageStyle(): string {
    return `url(${this.backgroundImage})`;
  }
}
