import { Injectable } from '@angular/core';
import {
  CharacterClass,
  CharacterEvolution,
  MonsterDifficulty,
  Rarity,
  SupercellGame,
} from '@vinz-sc/squadbustersfr-api';

import { CharacterFilter } from '../models/CharacterFilter';
import { MonsterFilter } from '../models/MonsterFilter';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public translateCharacterFilter(filter: CharacterFilter): string {
    switch (filter) {
      case CharacterFilter.Class:
        return 'Classe';
      case CharacterFilter.Rarity:
        return 'Rareté';
      case CharacterFilter.WorldId:
        return 'Monde';
      default:
        return '';
    }
  }

  public translateClass(characterClass: CharacterClass): string {
    switch (characterClass) {
      case CharacterClass.AllRounders:
        return 'Tout-terrain';
      case CharacterClass.Attackers:
        return 'Attaquant';
      case CharacterClass.Defenders:
        return 'Défenseur';
      case CharacterClass.Healers:
        return 'Soigneur';
      case CharacterClass.Speedsters:
        return 'Sprinteur';
      case CharacterClass.Suppliers:
        return 'Grippe-sou';
      default:
        return '';
    }
  }

  public translateDifficulty(difficulty: MonsterDifficulty): string {
    switch (difficulty) {
      case MonsterDifficulty.Small:
        return 'Facile';
      case MonsterDifficulty.Medium:
        return 'Moyen';
      case MonsterDifficulty.Boss:
        return 'Boss';
      default:
        return '';
    }
  }

  public translateEvolution(evolution: CharacterEvolution): string {
    switch (evolution) {
      case CharacterEvolution.Baby:
        return "P'tit";
      case CharacterEvolution.Classic:
        return 'Classique';
      case CharacterEvolution.Super:
        return 'Super';
      case CharacterEvolution.Ultra:
        return 'Ultra';
      default:
        return '';
    }
  }

  public translateGame(game: SupercellGame): string {
    switch (game) {
      case SupercellGame.BoomBeach:
        return 'Boom Beach';
      case SupercellGame.BrawlStars:
        return 'Brawl Stars';
      case SupercellGame.ClashOfClans:
        return 'Clash of Clans';
      case SupercellGame.ClashRoyale:
        return 'Clash Royale';
      case SupercellGame.HayDay:
        return 'Hay Day';
      case SupercellGame.SquadBusters:
        return 'Squad Busters';
      default:
        return game;
    }
  }

  public translateMonsterFilter(filter: MonsterFilter): string {
    switch (filter) {
      case MonsterFilter.Difficulty:
        return 'Difficulté';
      case MonsterFilter.WorldId:
        return 'Monde';
      default:
        return '';
    }
  }

  public translateRarity(rarity: Rarity): string {
    switch (rarity) {
      case Rarity.Common:
        return 'Commun';
      case Rarity.Rare:
        return 'Rare';
      case Rarity.Epic:
        return 'Épique';
      default:
        return '';
    }
  }
}
