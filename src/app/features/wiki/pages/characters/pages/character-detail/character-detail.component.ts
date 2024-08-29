import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Character,
  CharacterEvolution,
  Rarity,
  Spell,
} from '@vinz-sc/squadbustersfr-api';

import { take } from 'rxjs';

import { CoreService } from '../../../../../../core/services/core.service';
import { TranslatorService } from '../../../../../../core/services/translator.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.scss',
})
export class CharacterDetailComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _character: Character | null = null;

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

        this._character = await this._coreService.api.characters
          .getByUrl(partialUrl)
          .execute();
      });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public translateEvolution(evolution: CharacterEvolution): string {
    return this._translatorService.translateEvolution(evolution);
  }

  public translateRarity(rarity: Rarity): string {
    return this._translatorService.translateRarity(rarity);
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get character(): Character | null {
    return this._character;
  }

  public get color(): string {
    return `var(--sb-${this._rarity})`;
  }

  public get headerBackground(): string {
    if (this._character) {
      return `var(--sb-${this._rarity}-gradient)`;
    } else {
      return 'url("/assets/images/header.png") center center / cover';
    }
  }

  public get linearGradient(): string {
    return `var(--sb-${this._rarity}-gradient)`;
  }

  public get spells(): Spell[] {
    return (
      this._character?.spells.sort((a, b) => a.name.localeCompare(b.name)) ?? []
    );
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _rarity(): string {
    return this._character?.rarity.toLowerCase() ?? '';
  }
}
