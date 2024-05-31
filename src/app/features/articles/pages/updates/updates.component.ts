import { Component, OnInit } from '@angular/core';
import { Article } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss',
})
export class UpdatesComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public readonly ITEMS_PER_PAGE: number = 8;
  public readonly MAXIMUM_PAGES: number = 5;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _currentPage: number = 1;
  private _loading: boolean = true;
  private _updates: Article[] = [];
  private _updatesCount: number = this.ITEMS_PER_PAGE;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _coreService: CoreService) {}

  async ngOnInit(): Promise<void> {
    this._updates = await this._coreService.api.articles
      .get()
      .addParam('type', 'sneakPeek')
      .addParam('published', 'true')
      .execute();

    this._updatesCount = this._updates.length;

    this._loading = false;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get currentPage(): number {
    return this._currentPage;
  }

  public get loading(): boolean {
    return this._loading;
  }

  public get loadingArray(): number[] {
    return Array.from({ length: this.ITEMS_PER_PAGE }, (_, i) => i + 1);
  }

  public get updates(): Article[] {
    return this._updates.slice(this._startIndex, this._endIndex);
  }

  public get updatesCount(): number {
    return this._updatesCount;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set currentPage(value: number) {
    this._currentPage = value;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private get _startIndex(): number {
    return (this._currentPage - 1) * this.ITEMS_PER_PAGE;
  }

  private get _endIndex(): number {
    return this._currentPage * this.ITEMS_PER_PAGE;
  }
}
