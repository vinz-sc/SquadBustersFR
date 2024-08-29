import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { ArticlesModule } from './features/articles/articles.module';
import { HomeModule } from './features/home/home.module';
import { WikiModule } from './features/wiki/wiki.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    ArticlesModule,
    BrowserModule,
    CommonModule,
    CoreModule,
    HomeModule,
    NgbModule,
    SharedModule,
    WikiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
