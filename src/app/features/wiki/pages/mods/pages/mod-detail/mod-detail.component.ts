import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Character,
  Mod,
  Monster,
  MonsterDifficulty,
  World,
} from '@vinz-sc/squadbustersfr-api';

import { take } from 'rxjs';

import { CoreService } from '../../../../../../core/services/core.service';

@Component({
  selector: 'app-mod-detail',
  templateUrl: './mod-detail.component.html',
  styleUrl: './mod-detail.component.scss',
})
export class ModDetailComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _monsterDifficulties: string[] =
    Object.values(MonsterDifficulty);

  private _mod: Mod | null = null;
  private _world: World | null = null;

  private _usefulCharacters: {
    characterName: string;
    characterUrl: string;
    description: string;
  }[] = [];

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

        this._mod = await this._coreService.api.mods
          .getByUrl(partialUrl)
          .execute();

        if (this._mod?.worldId) {
          this._world = await this._coreService.api.worlds
            .getById(this._mod.worldId)
            .execute();
        }

        this._mod?.usefulCharacters.forEach(async (mc) => {
          const character = await this._coreService.api.characters
            .getById(mc.characterId)
            .execute();

          if (character) {
            this._usefulCharacters.push({
              characterName: character.name,
              characterUrl: `/wiki/characters/${character.partialUrl}`,
              description: mc.description,
            });
          }
        });
      });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get headerBackground(): string {
    if (this._mod) {
      return `url(${this._mod.bannerUrl}) center center / cover`;
    } else {
      return 'url("/assets/images/header.png") center center / cover';
    }
  }

  public get linkColor(): string {
    return this._coreService.preferredTheme === 'dark'
      ? 'var(--sb-primary-color-rgb)'
      : 'var(--sb-secondary-color-rgb)';
  }

  public get mod(): Mod | null {
    return this._mod;
  }

  public get monsters(): Monster[] {
    return (
      this._mod?.monsters.sort((a, b) => {
        const difficultyA = this._monsterDifficulties.indexOf(a.difficulty);
        const difficultyB = this._monsterDifficulties.indexOf(b.difficulty);

        if (difficultyA === difficultyB) {
          return a.name.localeCompare(b.name);
        } else {
          return difficultyA - difficultyB;
        }
      }) ?? []
    );
  }

  public get usefulCharacters(): {
    characterName: string;
    characterUrl: string;
    description: string;
  }[] {
    return this._usefulCharacters;
  }

  public get world(): World | null {
    return this._world;
  }

  public get worldLink(): string {
    return `/wiki/worlds/${this._world?.partialUrl}`;
  }
}
