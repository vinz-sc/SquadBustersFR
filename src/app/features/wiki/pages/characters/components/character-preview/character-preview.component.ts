import { Component, Input } from '@angular/core';
import { Character } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-character-preview',
  templateUrl: './character-preview.component.html',
  styleUrl: './character-preview.component.scss',
})
export class CharacterPreviewComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public character: Character | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get backgroundImage(): string {
    return `url(${this._backgroundUrl})`;
  }

  public get class(): string {
    return this.character?.class ?? '';
  }

  public get classIconUrl(): string {
    return `assets/images/wiki/classes/${this.class.toLowerCase()}.png`;
  }

  public get gradient(): string {
    return `var(--sb-${this._rarity}-gradient)`;
  }

  public get link(): string {
    return `/wiki/characters/${this.character?.partialUrl}`;
  }

  public get name(): string {
    return this.character?.name ?? '';
  }

  public get profileUrl(): string {
    return this.character?.profiles.at(1)?.imageUrl ?? '';
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _backgroundUrl(): string {
    return `/assets/images/backgrounds/${this._rarity}.png`;
  }

  private get _rarity(): string {
    return this.character?.rarity.toLowerCase() ?? '';
  }
}
