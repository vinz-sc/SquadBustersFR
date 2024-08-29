import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Monster, MonsterDifficulty, World } from '@vinz-sc/squadbustersfr-api';

import { take } from 'rxjs';

import { MonsterFilter } from '../../../../core/models/MonsterFilter';
import { CoreService } from '../../../../core/services/core.service';
import { TranslatorService } from '../../../../core/services/translator.service';

type FilteredMonster = {
  header: string;
  headerIcon: string | null;
  monsters: Monster[];
};

@Component({
  selector: 'app-monsters',
  templateUrl: './monsters.component.html',
  styleUrl: './monsters.component.scss',
})
export class MonstersComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _allMonsters: Monster[] = [];
  private _currentFilter: MonsterFilter = MonsterFilter.WorldId;
  private _difficulties: string[] = Object.values(MonsterDifficulty);
  private _filteredMonsters: FilteredMonster[] = [];
  private _monsters: Monster[] = [];
  private _worlds: World[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _coreService: CoreService,
    private readonly _translatorService: TranslatorService
  ) {}

  async ngOnInit(): Promise<void> {
    // Get the filter from the route
    this._activatedRoute.queryParams //
      .pipe(take(1))
      .subscribe((params) => {
        const filter = params['filter'] as MonsterFilter | undefined;

        if (filter) {
          this._currentFilter = filter;
        }
      });

    // Get all the monsters
    this._allMonsters = await this._coreService.api.monsters //
      .getAll()
      .execute();

    // Get all the worlds
    this._worlds = await this._coreService.api.worlds //
      .getAll()
      .execute();

    // Sort the monsters by difficulty, then by name
    this._allMonsters.sort((a, b) => {
      if (a.difficulty === b.difficulty) {
        return a.name.localeCompare(b.name);
      } else {
        const difficultyA = this._difficulties.indexOf(a.difficulty);
        const difficultyB = this._difficulties.indexOf(b.difficulty);

        return difficultyA - difficultyB;
      }
    });

    // Initialize the monsters
    this._monsters = this._allMonsters;
    this._groupMonstersBy();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onSearched(event: RegExp): void {
    this._monsters = this._allMonsters.filter((monster) => {
      return event.test(monster.name);
    });

    this._groupMonstersBy();
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get currentFilter(): MonsterFilter {
    return this._currentFilter;
  }

  public get filteredMonsters(): FilteredMonster[] {
    return this._filteredMonsters;
  }

  public get filterOptions(): { [key: string]: string } {
    return Object.values(MonsterFilter) //
      .reduce((acc, filter) => {
        acc[filter] = this._translatorService.translateMonsterFilter(filter);

        return acc;
      }, {} as { [key: string]: string });
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set currentFilter(value: MonsterFilter) {
    this._currentFilter = value;
    this._groupMonstersBy();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _groupByDifficulty(): void {
    const groupedMonsters = this._coreService.groupBy(
      this._monsters,
      'difficulty'
    );

    this._filteredMonsters = Object.entries(groupedMonsters).map(
      ([characterDifficulty, monsters]) => {
        return {
          header: this._translatorService.translateDifficulty(
            characterDifficulty as MonsterDifficulty
          ),
          headerIcon: null,
          monsters,
        };
      }
    );

    this._filteredMonsters.sort((a, b) => {
      const difficultyA = this._difficulties.indexOf(a.header);
      const difficultyB = this._difficulties.indexOf(b.header);

      return difficultyA - difficultyB;
    });
  }

  private _groupByWorld(): void {
    // For each world, create a group of monsters
    this._filteredMonsters = this._worlds.map((world) => {
      const monsters = this._monsters.filter((monster) => {
        return monster.worlds.some((w) => w.id === world.id);
      });

      return {
        header: world.name,
        headerIcon: world.iconUrl,
        monsters,
      };
    });

    // Remove empty groups
    this._filteredMonsters = this._filteredMonsters.filter(
      (group) => group.monsters.length > 0
    );

    // Sort the groups by world order
    this._filteredMonsters.sort((a, b) => {
      const worldA = this._worlds.find((w) => w.name === a.header);
      const worldB = this._worlds.find((w) => w.name === b.header);

      if (worldA?.unlockedOrder === worldB?.unlockedOrder) {
        return a.header.localeCompare(b.header);
      } else {
        return (worldA?.unlockedOrder ?? 999) - (worldB?.unlockedOrder ?? 999);
      }
    });

    // Add a group for monsters that are not in any world
    const otherMonsters = this._monsters.filter((monster) => {
      return monster.worlds.length === 0;
    });

    if (otherMonsters.length > 0) {
      this._filteredMonsters.push({
        header: 'Autres monstres',
        headerIcon: null,
        monsters: otherMonsters,
      });
    }
  }

  private _groupMonstersBy(): void {
    switch (this._currentFilter) {
      case MonsterFilter.Difficulty:
        this._groupByDifficulty();
        break;
      case MonsterFilter.WorldId:
        this._groupByWorld();
        break;
    }
  }
}
