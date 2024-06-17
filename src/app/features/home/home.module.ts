import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  bootstrapChevronRight,
  bootstrapTiktok,
  bootstrapTwitterX,
  bootstrapYoutube,
} from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { ArticleCardComponent } from './components/article-card/article-card.component';
import { CreatorCardComponent } from './components/creator-card/creator-card.component';

@NgModule({
  declarations: [ArticleCardComponent, CreatorCardComponent, HomeComponent],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    NgIconsModule.withIcons({
      bootstrapChevronRight,
      bootstrapTiktok,
      bootstrapTwitterX,
      bootstrapYoutube,
    }),
    SharedModule,
  ],
})
export class HomeModule {}
