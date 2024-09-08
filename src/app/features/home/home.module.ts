import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
  bootstrapChevronRight,
  bootstrapDiscord,
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
import { DevResumeComponent } from './components/dev-resume/dev-resume.component';

@NgModule({
  declarations: [
    ArticleCardComponent,
    CreatorCardComponent,
    DevResumeComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    NgIconsModule.withIcons({
      bootstrapChevronRight,
      bootstrapDiscord,
      bootstrapTiktok,
      bootstrapTwitterX,
      bootstrapYoutube,
    }),
    SharedModule,
  ],
})
export class HomeModule {}
