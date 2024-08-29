import { Component, Input, OnInit } from '@angular/core';
import {
  CharacterClass,
  Rarity,
  SupercellGame,
  World,
} from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../../../../../../../core/services/core.service';
import { TranslatorService } from '../../../../../../../../core/services/translator.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrl: './informations.component.scss',
})
export class InformationsComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _world: World | null = null;

  @Input()
  public class: CharacterClass | null = null;

  @Input()
  public description: string | null = null;

  @Input()
  public games: SupercellGame[] = [];

  @Input()
  public rarity: Rarity | null = null;

  @Input()
  public worldId: string | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private readonly _coreService: CoreService,
    private readonly _translatorService: TranslatorService
  ) {}

  async ngOnInit(): Promise<void> {
    // Get the world
    if (this.worldId) {
      this._world = await this._coreService.api.worlds
        .getById(this.worldId)
        .execute();
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public translateClass(characterClass: CharacterClass | null): string {
    if (!characterClass) {
      return '';
    } else {
      return this._translatorService.translateClass(characterClass);
    }
  }

  public translateGame(game: SupercellGame): string {
    return this._translatorService.translateGame(game);
  }

  public translateRarity(rarity: Rarity | null): string {
    if (!rarity) {
      return '';
    } else {
      return this._translatorService.translateRarity(rarity);
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get classIconUrl(): string {
    return `assets/images/wiki/classes/${this.class?.toLowerCase()}.png`;
  }

  public get gameUrls(): string[] {
    return this.games.map(
      (game) => `assets/images/wiki/games/${game.toLowerCase()}.png`
    );
  }

  public get linkColor(): string {
    return this._coreService.preferredTheme === 'dark'
      ? 'var(--sb-primary-color-rgb)'
      : 'var(--sb-secondary-color-rgb)';
  }

  public get rarityIconUrl(): string {
    return `assets/images/wiki/chests/${this.rarity?.toLowerCase()}.png`;
  }

  public get world(): World | null {
    return this._world;
  }

  public get worldUrl(): string {
    return `/wiki/worlds/${this._world?.partialUrl}`;
  }
}
