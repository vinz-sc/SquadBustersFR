import { Component, Input } from '@angular/core';
import { GameMode } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-game-mode-preview',
  templateUrl: './game-mode-preview.component.html',
  styleUrl: './game-mode-preview.component.scss',
})
export class GameModePreviewComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public gameMode: GameMode | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get backgroundImage(): string {
    return `url(${this.gameMode?.bannerUrl})`;
  }

  public get link(): string {
    return `/wiki/game-modes/${this.gameMode?.partialUrl}`;
  }
}
