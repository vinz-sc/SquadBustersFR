import { Component, Input } from '@angular/core';
import { SupercellGame } from '@vinz-sc/squadbustersfr-api';

import { TranslatorService } from '../../../../../../../../core/services/translator.service';

@Component({
  selector: 'app-world-informations',
  templateUrl: './world-informations.component.html',
  styleUrl: './world-informations.component.scss',
})
export class WorldInformationsComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public aventureSquad: string | null = null;

  @Input()
  public charactersCount: number | null = null;

  @Input()
  public inspiringGame: SupercellGame | null = null;

  @Input()
  public modsCount: number | null = null;

  @Input()
  public monstersCount: number | null = null;

  @Input()
  public render3DUrl: string | null = null;

  @Input()
  public spellsCount: number | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _translatorService: TranslatorService) {}

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get translatedGame(): string {
    if (this.inspiringGame) {
      return this._translatorService.translateGame(this.inspiringGame);
    } else {
      return '';
    }
  }
}
