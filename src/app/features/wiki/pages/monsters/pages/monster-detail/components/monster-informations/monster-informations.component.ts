import { Component, Input } from '@angular/core';
import { SupercellGame, World } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../../../../../../../core/services/core.service';
import { TranslatorService } from '../../../../../../../../core/services/translator.service';

@Component({
  selector: 'app-monster-informations',
  templateUrl: './monster-informations.component.html',
  styleUrl: './monster-informations.component.scss',
})
export class MonsterInformationsComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public damage: number | null = null;

  @Input()
  public destructionGemBonus: number | null = null;

  @Input()
  public destructionGoldBonus: number | null = null;

  @Input()
  public games: SupercellGame[] = [];

  @Input()
  public health: number | null = null;

  @Input()
  public translatedDifficulty: string = '';

  @Input()
  public worlds: World[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private readonly _coreService: CoreService,
    private readonly _translatorService: TranslatorService
  ) {}

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public buildWorldLink(world: World): string {
    return `/wiki/worlds/${world.partialUrl}`;
  }

  public translateGame(game: SupercellGame): string {
    return this._translatorService.translateGame(game);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get gameUrls(): string[] {
    return this.games.map(
      (game) => `/assets/images/wiki/games/${game.toLowerCase()}.png`
    );
  }

  public get isDestructionBonus(): boolean {
    return (
      this.destructionGoldBonus !== null || this.destructionGemBonus !== null
    );
  }

  public get isStatistics(): boolean {
    return this.damage !== null || this.health !== null;
  }

  public get linkColor(): string {
    return this._coreService.preferredTheme === 'dark'
      ? 'var(--sb-primary-color-rgb)'
      : 'var(--sb-secondary-color-rgb)';
  }
}
