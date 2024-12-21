import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesComponent } from './articles.component';

import { FullArticleComponent } from './components/full-article/full-article.component';

import { NewsComponent } from './pages/news/news.component';
import { UpdatesComponent } from './pages/updates/updates.component';

const routes: Routes = [
  {
    path: 'article/:bitlyId',
    component: ArticlesComponent,
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'news/:partialUrl',
    component: FullArticleComponent,
  },
  {
    path: 'updates',
    component: UpdatesComponent,
  },
  {
    path: 'updates/:partialUrl',
    component: FullArticleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
