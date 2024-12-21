import { Component, OnInit } from '@angular/core';
import { GameMode } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-game-modes',
  templateUrl: './game-modes.component.html',
  styleUrl: './game-modes.component.scss',
})
export class GameModesComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _allGameModes: GameMode[] = [];
  private _gameModes: GameMode[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _coreService: CoreService) {}

  async ngOnInit(): Promise<void> {
    // Get all the game modes
    this._allGameModes = await this._coreService.api.gameModes //
      .getAll()
      .execute();

    // Sort the game modes by name
    this._allGameModes.sort((a, b) => a.name.localeCompare(b.name));

    // Initialize the game modes
    this._gameModes = this._allGameModes;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onSearched(event: RegExp): void {
    this._gameModes = this._allGameModes.filter((gameMode) => {
      return event.test(gameMode.name);
    });
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get gameModes(): GameMode[] {
    return this._gameModes;
  }
}
