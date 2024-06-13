import { Component, OnInit } from '@angular/core';
import { Article } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../core/services/core.service';

import { Creator } from '../../core/models/Creator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly ARTICLES_ON_HOME = '3';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _latestNews: Article[] = [];
  private _latestUpdates: Article[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _coreService: CoreService) {}

  async ngOnInit(): Promise<void> {
    this._latestNews = await this._coreService.api.articles
      .get()
      .addParam('type', 'news')
      .addParam('published', 'true')
      .addParam('limit', this.ARTICLES_ON_HOME)
      .execute();

    this._latestUpdates = await this._coreService.api.articles
      .get()
      .addParam('type', 'sneakPeek')
      .addParam('published', 'true')
      .addParam('limit', this.ARTICLES_ON_HOME)
      .execute();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get creators(): Creator[] {
    return this._coreService.creators;
  }

  public get latestNews(): Article[] {
    return this._latestNews;
  }

  public get latestUpdates(): Article[] {
    return this._latestUpdates;
  }
}
