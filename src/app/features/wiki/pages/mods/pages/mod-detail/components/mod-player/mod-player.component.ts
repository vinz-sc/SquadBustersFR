import { Component, Input } from '@angular/core';
import { Player } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-mod-player',
  templateUrl: './mod-player.component.html',
  styleUrl: './mod-player.component.scss',
})
export class ModPlayerComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public player: Player | null = null;
}
