import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import {
  bootstrapChevronDoubleLeft,
  bootstrapChevronLeft,
  bootstrapChevronRight,
} from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './articles.component';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { NewsComponent } from './pages/news/news.component';
import { UpdatesComponent } from './pages/updates/updates.component';

import { FullArticleComponent } from './components/full-article/full-article.component';
import { LoadingCardComponent } from './components/loading-card/loading-card.component';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';

@NgModule({
  declarations: [
    ArticlesComponent,
    FullArticleComponent,
    LoadingCardComponent,
    NewsComponent,
    PreviewCardComponent,
    UpdatesComponent,
  ],
  imports: [
    ArticlesRoutingModule,
    CommonModule,
    CoreModule,
    NgIconsModule.withIcons({
      bootstrapChevronDoubleLeft,
      bootstrapChevronLeft,
      bootstrapChevronRight,
    }),
    NgbPaginationModule,
    SharedModule,
  ],
})
export class ArticlesModule {}
