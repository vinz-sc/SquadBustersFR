import { Component, Input } from '@angular/core';
import { Player } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-spell-player',
  templateUrl: './spell-player.component.html',
  styleUrl: './spell-player.component.scss',
})
export class SpellPlayerComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public player: Player | null = null;
}
