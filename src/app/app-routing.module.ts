import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home-routing.module').then(
        (m) => m.HomeRoutingModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/articles/articles-routing.module').then(
        (m) => m.ArticlesRoutingModule
      ),
  },
  {
    path: 'wiki',
    loadChildren: () =>
      import('./features/wiki/wiki-routing.module').then(
        (m) => m.WikiRoutingModule
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
