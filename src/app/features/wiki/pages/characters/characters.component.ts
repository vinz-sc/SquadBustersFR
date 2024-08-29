import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Character,
  CharacterClass,
  Rarity,
  World,
} from '@vinz-sc/squadbustersfr-api';

import { take } from 'rxjs';

import { CharacterFilter } from '../../../../core/models/CharacterFilter';
import { CoreService } from '../../../../core/services/core.service';
import { TranslatorService } from '../../../../core/services/translator.service';

type FilteredCharacter = {
  header: string;
  headerIcon: string | null;
  characters: Character[];
};

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _allCharacters: Character[] = [];
  private _characters: Character[] = [];
  private _currentFilter: CharacterFilter = CharacterFilter.WorldId;
  private _filteredCharacters: FilteredCharacter[] = [];
  private _rarities: string[] = Object.values(Rarity);
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
        const filter = params['filter'] as CharacterFilter | undefined;

        if (filter) {
          this._currentFilter = filter;
        }
      });

    // Get all the characters
    this._allCharacters = await this._coreService.api.characters
      .getAll()
      .execute();

    // Get all the worlds
    this._worlds = await this._coreService.api.worlds //
      .getAll()
      .execute();

    // Sort the characters by rarity, then by name
    this._allCharacters = this._allCharacters.sort((a, b) => {
      if (a.rarity === b.rarity) {
        return a.name.localeCompare(b.name);
      } else {
        const rarityA = this._rarities.indexOf(a.rarity);
        const rarityB = this._rarities.indexOf(b.rarity);

        return rarityA - rarityB;
      }
    });

    this._characters = this._allCharacters;
    this._groupCharactersBy();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onSearched(event: RegExp): void {
    this._characters = this._allCharacters.filter((character) =>
      event.test(character.name)
    );

    this._groupCharactersBy();
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get currentFilter(): CharacterFilter {
    return this._currentFilter;
  }

  public get filteredCharacters(): FilteredCharacter[] {
    return this._filteredCharacters;
  }

  public get filterOptions(): { [key: string]: string } {
    return Object.values(CharacterFilter) //
      .reduce((acc, filter) => {
        acc[filter] = this._translatorService.translateCharacterFilter(filter);

        return acc;
      }, {} as { [key: string]: string });
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set currentFilter(filter: CharacterFilter) {
    this._currentFilter = filter;

    this._groupCharactersBy();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _groupByClass(): void {
    const groupedCharacters = this._coreService.groupBy(
      this._characters,
      'class'
    );

    this._filteredCharacters = Object.entries(groupedCharacters).map(
      ([characterClass, characters]) => {
        return {
          header: this._translatorService.translateClass(
            characterClass as CharacterClass
          ),
          headerIcon: `/assets/images/wiki/classes/${characterClass.toLowerCase()}.png`,
          characters,
        };
      }
    );

    this._filteredCharacters = this._filteredCharacters.sort((a, b) =>
      a.header.localeCompare(b.header)
    );
  }

  private _groupByRarity(): void {
    const groupedCharacters = this._coreService.groupBy(
      this._characters,
      'rarity'
    );

    this._filteredCharacters = Object.entries(groupedCharacters).map(
      ([rarity, characters]) => {
        return {
          header: this._translatorService.translateRarity(rarity as Rarity),
          headerIcon: null,
          characters,
        };
      }
    );

    this._filteredCharacters = this._filteredCharacters.sort(
      (a, b) =>
        this._rarities.indexOf(a.header) - this._rarities.indexOf(b.header)
    );
  }

  private _groupByWorld(): void {
    const groupedCharacters = this._coreService.groupBy(
      this._characters,
      'worldId'
    );

    this._filteredCharacters = Object.entries(groupedCharacters).map(
      ([worldId, characters]) => {
        const world = this._worlds.find((w) => w.id === worldId);

        return {
          header: world?.name ?? 'Autres personnages',
          headerIcon: world?.iconUrl ?? null,
          characters,
        };
      }
    );

    this._filteredCharacters = this._filteredCharacters.sort((a, b) => {
      const worldA = this._worlds.find((w) => w.name === a.header);
      const worldB = this._worlds.find((w) => w.name === b.header);

      if (worldA?.unlockedOrder === worldB?.unlockedOrder) {
        return a.header.localeCompare(b.header);
      } else {
        return (worldA?.unlockedOrder ?? 999) - (worldB?.unlockedOrder ?? 999);
      }
    });
  }

  private _groupCharactersBy(): void {
    switch (this._currentFilter) {
      case 'class':
        this._groupByClass();
        break;
      case 'rarity':
        this._groupByRarity();
        break;
      case 'worldId':
        this._groupByWorld();
        break;
    }
  }
}
