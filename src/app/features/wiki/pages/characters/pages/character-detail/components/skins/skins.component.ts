import { Component, Input } from '@angular/core';
import {
  CharacterSkin,
  CharacterSkinRarity,
  Rarity,
} from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-skins',
  templateUrl: './skins.component.html',
  styleUrl: './skins.component.scss',
})
export class SkinsComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public characterRarity: Rarity | null = null;

  @Input()
  public skins: CharacterSkin[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public getSkinIconUrl(rarity: CharacterSkinRarity): string {
    return `assets/images/wiki/skin_${rarity.toLowerCase()}.png`;
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get linearGradient(): string {
    if (this.characterRarity) {
      return `var(--sb-${this.characterRarity.toLowerCase()}-gradient)`;
    } else {
      return '';
    }
  }
}
