import { Component, Input } from '@angular/core';
import { Ability, CharacterEvolution } from '@vinz-sc/squadbustersfr-api';

import { TranslatorService } from '../../../../../../../../core/services/translator.service';

@Component({
  selector: 'app-abilities',
  templateUrl: './abilities.component.html',
  styleUrl: './abilities.component.scss',
})
export class AbilitiesComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _evolutions = Object.values(CharacterEvolution);

  @Input()
  public abilities: Ability[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _translatorService: TranslatorService) {}

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public parseEvolutionAsLevel(evolution: CharacterEvolution) {
    return this._evolutions.indexOf(evolution) + 1;
  }

  public translateEvolution(evolution: CharacterEvolution): string {
    return this._translatorService.translateEvolution(evolution);
  }
}
