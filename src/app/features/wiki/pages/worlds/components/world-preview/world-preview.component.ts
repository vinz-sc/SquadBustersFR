import { Component, Input } from '@angular/core';
import { World } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-world-preview',
  templateUrl: './world-preview.component.html',
  styleUrl: './world-preview.component.scss',
})
export class WorldPreviewComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public world: World | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get backgroundImage(): string {
    return `url(${this.world?.bannerUrl})`;
  }

  public get link(): string {
    return `/wiki/worlds/${this.world?.partialUrl}`;
  }
}
