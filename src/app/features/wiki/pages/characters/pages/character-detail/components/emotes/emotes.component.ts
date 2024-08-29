import { Component, Input } from '@angular/core';
import { Emote, Rarity } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-emotes',
  templateUrl: './emotes.component.html',
  styleUrl: './emotes.component.scss',
})
export class EmotesComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public emotes: Emote[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public getLinearGradient(rarity: Rarity | null): string {
    if (rarity) {
      return `var(--sb-${rarity.toLowerCase()}-gradient)`;
    } else {
      return '';
    }
  }
}
