import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewsComponent } from './pages/news/news.component';
import { UpdatesComponent } from './pages/updates/updates.component';
import { FullArticleComponent } from './components/full-article/full-article.component';

const routes: Routes = [
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
