import { Component, OnInit } from '@angular/core';
import { Spell, World } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../../../core/services/core.service';

type FilteredSpell = {
  header: string;
  headerIcon: string | null;
  spells: Spell[];
};

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrl: './spells.component.scss',
})
export class SpellsComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _allSpells: Spell[] = [];
  private _filteredSpells: FilteredSpell[] = [];
  private _spells: Spell[] = [];
  private _worlds: World[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _coreService: CoreService) {}

  async ngOnInit(): Promise<void> {
    // Get all the spells
    this._allSpells = await this._coreService.api.spells //
      .getAll()
      .execute();

    // Get all the worlds
    this._worlds = await this._coreService.api.worlds //
      .getAll()
      .execute();

    // Sort the spells by name
    this._allSpells.sort((a, b) => a.name.localeCompare(b.name));
    this._spells = this._allSpells;

    this._groupSpells();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onSearched(event: RegExp): void {
    this._spells = this._allSpells.filter((spell) => {
      return event.test(spell.name);
    });

    this._groupSpells();
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get filteredSpells(): FilteredSpell[] {
    return this._filteredSpells;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _groupSpells(): void {
    const groupedSpells = this._coreService.groupBy(this._spells, 'worldId');

    this._filteredSpells = Object.entries(groupedSpells).map(
      ([worldId, spells]) => {
        const world = this._worlds.find((w) => w.id === worldId);

        return {
          header: world?.name ?? 'Autres sorts',
          headerIcon: world?.iconUrl ?? null,
          spells,
        };
      }
    );

    this._filteredSpells = this._filteredSpells.sort((a, b) => {
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
