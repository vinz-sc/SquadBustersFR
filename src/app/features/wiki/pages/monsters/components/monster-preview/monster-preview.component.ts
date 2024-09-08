import { Component, Input } from '@angular/core';
import { Monster, MonsterDifficulty } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-monster-preview',
  templateUrl: './monster-preview.component.html',
  styleUrl: './monster-preview.component.scss',
})
export class MonsterPreviewComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public monster: Monster | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get backgroundImage(): string {
    if (
      this.monster?.modId &&
      this.monster.difficulty === MonsterDifficulty.Boss
    ) {
      return `url('/assets/images/backgrounds/boss-special.png')`;
    } else if (this.monster?.modId) {
      return `url('/assets/images/backgrounds/game.png')`;
    } else {
      return `url('/assets/images/backgrounds/${this._difficulty}.png')`;
    }
  }

  public get linearGradient(): string {
    if (
      this.monster?.modId &&
      this.monster.difficulty === MonsterDifficulty.Boss
    ) {
      return 'var(--sb-boss-special-gradient)';
    } else if (this.monster?.modId) {
      return 'var(--sb-special-gradient)';
    } else {
      return `var(--sb-${this._difficulty}-gradient)`;
    }
  }

  public get link(): string {
    return `/wiki/monsters/${this.monster?.partialUrl}`;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _difficulty(): string {
    return this.monster?.difficulty.toLowerCase() ?? '';
  }
}
