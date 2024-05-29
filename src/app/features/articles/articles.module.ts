import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { ArticlesRoutingModule } from './articles-routing.module';

import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';

import { NewsComponent } from './pages/news/news.component';
import { UpdatesComponent } from './pages/updates/updates.component';

import { FullArticleComponent } from './components/full-article/full-article.component';
import { PreviewCardComponent } from './components/preview-card/preview-card.component';

@NgModule({
  declarations: [
    FullArticleComponent,
    NewsComponent,
    PreviewCardComponent,
    UpdatesComponent,
  ],
  imports: [
    ArticlesRoutingModule,
    CommonModule,
    CoreModule,
    NgbPaginationModule,
    NgxBootstrapIconsModule.pick(allIcons),
    SharedModule,
  ],
})
export class ArticlesModule {}
