import { Component, Input } from '@angular/core';
import { Spell } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-spell-preview',
  templateUrl: './spell-preview.component.html',
  styleUrl: './spell-preview.component.scss',
})
export class SpellPreviewComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public spell: Spell | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get backgroundImageUrl(): string {
    if (this.spell?.characterId) {
      return 'assets/images/wiki/spell_full_star.png';
    } else {
      return 'assets/images/wiki/spell_empty_star.png';
    }
  }

  public get link(): string {
    return `/wiki/spells/${this.spell?.partialUrl}`;
  }
}
