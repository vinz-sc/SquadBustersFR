import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WikiComponent } from './wiki.component';

import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterDetailComponent } from './pages/characters/pages/character-detail/character-detail.component';

import { GameModesComponent } from './pages/game-modes/game-modes.component';
import { GameModeDetailComponent } from './pages/game-modes/pages/game-mode-detail/game-mode-detail.component';

import { ModsComponent } from './pages/mods/mods.component';
import { ModDetailComponent } from './pages/mods/pages/mod-detail/mod-detail.component';

import { MonstersComponent } from './pages/monsters/monsters.component';
import { MonsterDetailComponent } from './pages/monsters/pages/monster-detail/monster-detail.component';

import { SpellDetailComponent } from './pages/spells/pages/spell-detail/spell-detail.component';
import { SpellsComponent } from './pages/spells/spells.component';

import { WorldDetailComponent } from './pages/worlds/pages/world-detail/world-detail.component';
import { WorldsComponent } from './pages/worlds/worlds.component';

const routes: Routes = [
  {
    path: '',
    component: WikiComponent,
  },
  {
    path: 'characters',
    component: CharactersComponent,
  },
  {
    path: 'characters/:partialUrl',
    component: CharacterDetailComponent,
  },
  {
    path: 'game-modes',
    component: GameModesComponent,
  },
  {
    path: 'game-modes/:partialUrl',
    component: GameModeDetailComponent,
  },
  {
    path: 'mods',
    component: ModsComponent,
  },
  {
    path: 'mods/:partialUrl',
    component: ModDetailComponent,
  },
  {
    path: 'monsters',
    component: MonstersComponent,
  },
  {
    path: 'monsters/:partialUrl',
    component: MonsterDetailComponent,
  },
  {
    path: 'spells',
    component: SpellsComponent,
  },
  {
    path: 'spells/:partialUrl',
    component: SpellDetailComponent,
  },
  // {
  //   path: 'various',
  //   component: VariousComponent,
  // },
  // {
  //   path: 'various/chests',
  //   component: ChestsComponent,
  // },
  // {
  //   path: 'various/portal-energy',
  //   component: PortalEnergyComponent,
  // },
  {
    path: 'worlds',
    component: WorldsComponent,
  },
  {
    path: 'worlds/:partialUrl',
    component: WorldDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WikiRoutingModule {}
