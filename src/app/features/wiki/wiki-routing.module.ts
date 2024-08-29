import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WikiComponent } from './wiki.component';

import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterDetailComponent } from './pages/characters/pages/character-detail/character-detail.component';

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
