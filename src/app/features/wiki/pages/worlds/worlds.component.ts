import { Component, OnInit } from '@angular/core';
import { World } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrl: './worlds.component.scss',
})
export class WorldsComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _allWorlds: World[] = [];
  private _worlds: World[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _coreService: CoreService) {}

  async ngOnInit(): Promise<void> {
    // Get all the worlds
    this._allWorlds = await this._coreService.api.worlds //
      .getAll()
      .execute();

    // Sort the worlds by unlockedOrder, then by name
    this._allWorlds.sort((a, b) => {
      if (a.unlockedOrder === b.unlockedOrder) {
        return a.name.localeCompare(b.name);
      } else {
        return a.unlockedOrder - b.unlockedOrder;
      }
    });

    // Initialize the worlds
    this._worlds = this._allWorlds;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onSearched(event: RegExp): void {
    this._worlds = this._allWorlds.filter((world) => {
      return event.test(world.name);
    });
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get worlds(): World[] {
    return this._worlds;
  }
}
