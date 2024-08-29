import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character, Spell, World } from '@vinz-sc/squadbustersfr-api';

import { take } from 'rxjs';

import { CoreService } from '../../../../../../core/services/core.service';

@Component({
  selector: 'app-spell-detail',
  templateUrl: './spell-detail.component.html',
  styleUrl: './spell-detail.component.scss',
})
export class SpellDetailComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _character: Character | null = null;
  private _spell: Spell | null = null;
  private _world: World | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params //
      .pipe(take(1))
      .subscribe(async (params) => {
        const partialUrl = params['partialUrl'];

        this._spell = await this._coreService.api.spells
          .getByUrl(partialUrl)
          .execute();

        if (this._spell?.characterId) {
          this._character = await this._coreService.api.characters
            .getById(this._spell.characterId)
            .execute();
        }

        if (this._spell?.worldId) {
          this._world = await this._coreService.api.worlds
            .getById(this._spell.worldId)
            .execute();
        }
      });
  }

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

  public get character(): Character | null {
    return this._character;
  }

  public get linkColor(): string {
    return this._coreService.preferredTheme === 'dark'
      ? 'var(--sb-primary-color-rgb)'
      : 'var(--sb-secondary-color-rgb)';
  }

  public get spell(): Spell | null {
    return this._spell;
  }

  public get world(): World | null {
    return this._world;
  }

  public get worldLink(): string {
    return `/wiki/worlds/${this._world?.partialUrl}`;
  }
}
