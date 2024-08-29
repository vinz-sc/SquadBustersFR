import { Component, OnInit } from '@angular/core';
import { Mod, World } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../../../core/services/core.service';

type FilteredMod = {
  header: string;
  headerIcon: string | null;
  mods: Mod[];
};

@Component({
  selector: 'app-mods',
  templateUrl: './mods.component.html',
  styleUrl: './mods.component.scss',
})
export class ModsComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _allMods: Mod[] = [];
  private _filteredMods: FilteredMod[] = [];
  private _mods: Mod[] = [];
  private _worlds: World[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _coreService: CoreService) {}

  async ngOnInit(): Promise<void> {
    // Get all the mods
    this._allMods = await this._coreService.api.mods //
      .getAll()
      .execute();

    // Get all the worlds
    this._worlds = await this._coreService.api.worlds //
      .getAll()
      .execute();

    // Sort the mods by name
    this._allMods.sort((a, b) => a.name.localeCompare(b.name));
    this._mods = this._allMods;

    this._groupMods();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onSearched(event: RegExp): void {
    this._mods = this._allMods.filter((mod) => {
      return event.test(mod.name);
    });

    this._groupMods();
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get filteredMods(): FilteredMod[] {
    return this._filteredMods;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _groupMods(): void {
    const groupedMods = this._coreService.groupBy(this._mods, 'worldId');

    this._filteredMods = Object.entries(groupedMods).map(([worldId, mods]) => {
      const world = this._worlds.find((w) => w.id === worldId);

      return {
        header: world?.name ?? 'Autres mods',
        headerIcon: world?.iconUrl ?? null,
        mods,
      };
    });

    this._filteredMods = this._filteredMods.sort((a, b) => {
      const worldA = this._worlds.find((w) => w.name === a.header);
      const worldB = this._worlds.find((w) => w.name === b.header);

      if (worldA?.unlockedOrder === worldB?.unlockedOrder) {
        return a.header.localeCompare(b.header);
      } else {
        return (worldA?.unlockedOrder ?? 999) - (worldB?.unlockedOrder ?? 999);
      }
    });
  }
}
