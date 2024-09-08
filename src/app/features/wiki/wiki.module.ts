import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  bootstrapChevronDoubleLeft,
  bootstrapFilter,
  bootstrapSearch,
} from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';

import { WikiRoutingModule } from './wiki-routing.module';
import { WikiComponent } from './wiki.component';

import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { CharactersComponent } from './pages/characters/characters.component';
import { ModsComponent } from './pages/mods/mods.component';
import { MonstersComponent } from './pages/monsters/monsters.component';
import { SpellsComponent } from './pages/spells/spells.component';
import { WorldsComponent } from './pages/worlds/worlds.component';

import { CharacterPreviewComponent } from './pages/characters/components/character-preview/character-preview.component';
import { CharacterDetailComponent } from './pages/characters/pages/character-detail/character-detail.component';
import { ModPreviewComponent } from './pages/mods/components/mod-preview/mod-preview.component';
import { ModDetailComponent } from './pages/mods/pages/mod-detail/mod-detail.component';
import { MonsterPreviewComponent } from './pages/monsters/components/monster-preview/monster-preview.component';
import { MonsterDetailComponent } from './pages/monsters/pages/monster-detail/monster-detail.component';
import { SpellPreviewComponent } from './pages/spells/components/spell-preview/spell-preview.component';
import { SpellDetailComponent } from './pages/spells/pages/spell-detail/spell-detail.component';
import { WorldPreviewComponent } from './pages/worlds/components/world-preview/world-preview.component';
import { WorldDetailComponent } from './pages/worlds/pages/world-detail/world-detail.component';

import { AbilitiesComponent } from './pages/characters/pages/character-detail/components/abilities/abilities.component';
import { EmotesComponent } from './pages/characters/pages/character-detail/components/emotes/emotes.component';
import { InformationsComponent } from './pages/characters/pages/character-detail/components/informations/informations.component';
import { ItemsComponent } from './pages/characters/pages/character-detail/components/items/items.component';
import { SkinsComponent } from './pages/characters/pages/character-detail/components/skins/skins.component';
import { StatisticsComponent } from './pages/characters/pages/character-detail/components/statistics/statistics.component';

import { ModItemsComponent } from './pages/mods/pages/mod-detail/components/mod-items/mod-items.component';
import { ModPlayerComponent } from './pages/mods/pages/mod-detail/components/mod-player/mod-player.component';

import { MonsterInformationsComponent } from './pages/monsters/pages/monster-detail/components/monster-informations/monster-informations.component';

import { SpellPlayerComponent } from './pages/spells/pages/spell-detail/components/spell-player/spell-player.component';

import { WorldImageModalComponent } from './pages/worlds/pages/world-detail/components/world-image-modal/world-image-modal.component';
import { WorldInformationsComponent } from './pages/worlds/pages/world-detail/components/world-informations/world-informations.component';
import { WorldMapsComponent } from './pages/worlds/pages/world-detail/components/world-maps/world-maps.component';

@NgModule({
  declarations: [
    AbilitiesComponent,
    CharacterDetailComponent,
    CharacterPreviewComponent,
    CharactersComponent,
    EmotesComponent,
    FilterComponent,
    InformationsComponent,
    ItemsComponent,
    ModDetailComponent,
    ModItemsComponent,
    ModPlayerComponent,
    ModPreviewComponent,
    ModsComponent,
    MonsterDetailComponent,
    MonsterInformationsComponent,
    MonsterPreviewComponent,
    MonstersComponent,
    SearchComponent,
    SkinsComponent,
    SpellDetailComponent,
    SpellPlayerComponent,
    SpellPreviewComponent,
    SpellsComponent,
    StatisticsComponent,
    WikiComponent,
    WorldDetailComponent,
    WorldImageModalComponent,
    WorldInformationsComponent,
    WorldMapsComponent,
    WorldPreviewComponent,
    WorldsComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    NgbModalModule,
    NgIconsModule.withIcons({
      bootstrapChevronDoubleLeft,
      bootstrapFilter,
      bootstrapSearch,
    }),
    RouterModule,
    SharedModule,
    WikiRoutingModule,
  ],
})
export class WikiModule {}
