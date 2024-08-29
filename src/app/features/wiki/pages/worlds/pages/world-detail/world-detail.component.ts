import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Character,
  Mod,
  Monster,
  MonsterDifficulty,
  Rarity,
  Spell,
  World,
} from '@vinz-sc/squadbustersfr-api';

import { take } from 'rxjs';

import { CoreService } from '../../../../../../core/services/core.service';

@Component({
  selector: 'app-world-detail',
  templateUrl: './world-detail.component.html',
  styleUrl: './world-detail.component.scss',
})
export class WorldDetailComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _monsterDifficulties: string[] =
    Object.values(MonsterDifficulty);
  private readonly _rarities: string[] = Object.values(Rarity);
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

        this._world = await this._coreService.api.worlds
          .getByUrl(partialUrl)
          .execute();
      });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get characters(): Character[] {
    return (
      this._world?.characters.sort((a, b) => {
        const rarityA = this._rarities.indexOf(a.rarity);
        const rarityB = this._rarities.indexOf(b.rarity);

        if (rarityA === rarityB) {
          return a.name.localeCompare(b.name);
        } else {
          return rarityA - rarityB;
        }
      }) ?? []
    );
  }

  public get headerBackground(): string {
    if (this._world) {
      return `url(${this._world.bannerUrl}) center center / cover`;
    } else {
      return 'url("/assets/images/header.png") center center / cover`;';
    }
  }

  public get mods(): Mod[] {
    return this._world?.mods.sort((a, b) => a.name.localeCompare(b.name)) ?? [];
  }

  public get monsters(): Monster[] {
    return (
      this._world?.monsters.sort((a, b) => {
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

  public get spells(): Spell[] {
    return (
      this._world?.spells.sort((a, b) => a.name.localeCompare(b.name)) ?? []
    );
  }

  public get world(): World | null {
    return this._world;
  }
}
