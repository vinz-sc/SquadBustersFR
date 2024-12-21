import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character, GameMode, Mod } from '@vinz-sc/squadbustersfr-api';

import { take } from 'rxjs';

import { CoreService } from '../../../../../../core/services/core.service';

@Component({
  selector: 'app-game-mode-detail',
  templateUrl: './game-mode-detail.component.html',
  styleUrl: './game-mode-detail.component.scss',
})
export class GameModeDetailComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _gameMode: GameMode | null = null;

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

        this._gameMode = await this._coreService.api.gameModes
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
    return this._gameMode?.restrictedCharacters ?? [];
  }

  public get gameMode(): GameMode | null {
    return this._gameMode;
  }

  public get mods(): Mod[] {
    return this._gameMode?.restrictedMods ?? [];
  }
}
