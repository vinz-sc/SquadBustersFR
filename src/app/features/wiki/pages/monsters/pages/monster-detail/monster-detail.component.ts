import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mod, Monster, MonsterDifficulty } from '@vinz-sc/squadbustersfr-api';

import { take } from 'rxjs';

import { CoreService } from '../../../../../../core/services/core.service';
import { TranslatorService } from '../../../../../../core/services/translator.service';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrl: './monster-detail.component.scss',
})
export class MonsterDetailComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _mod: Mod | null = null;
  private _monster: Monster | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _coreService: CoreService,
    private readonly _translatorService: TranslatorService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params //
      .pipe(take(1))
      .subscribe(async (params) => {
        const partialUrl = params['partialUrl'];

        this._monster = await this._coreService.api.monsters
          .getByUrl(partialUrl)
          .execute();

        if (this._monster?.modId) {
          this._mod = await this._coreService.api.mods
            .getById(this._monster.modId)
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

  public get color(): string {
    return `var(--sb-${this._difficulty})`;
  }

  public get headerBackground(): string {
    if (this._monster) {
      if (
        this._monster.modId &&
        this._monster.difficulty === MonsterDifficulty.Boss
      ) {
        return 'var(--sb-boss-special-gradient)';
      } else if (this._monster.modId) {
        return 'var(--sb-special-gradient)';
      } else {
        return `var(--sb-${this._difficulty}-gradient)`;
      }
    } else {
      return 'url("/assets/images/header.png") center center / cover';
    }
  }

  public get linearGradient(): string {
    if (
      this._monster?.modId &&
      this._monster.difficulty === MonsterDifficulty.Boss
    ) {
      return 'var(--sb-boss-special-gradient)';
    } else if (this._monster?.modId) {
      return 'var(--sb-special-gradient)';
    } else {
      return `var(--sb-${this._difficulty}-gradient)`;
    }
  }

  public get mod(): Mod | null {
    return this._mod;
  }

  public get monster(): Monster | null {
    return this._monster;
  }

  public get translatedDifficulty(): string {
    if (this._monster) {
      return this._translatorService.translateDifficulty(
        this._monster.difficulty
      );
    } else {
      return '';
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _difficulty(): string {
    return this._monster?.difficulty.toLowerCase() ?? '';
  }
}
