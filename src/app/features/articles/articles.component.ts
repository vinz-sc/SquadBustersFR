import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleType } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _coreService: CoreService,
    private readonly _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const bitlyId = this._activatedRoute.snapshot.params['bitlyId'];

    try {
      const article = await this._coreService.api.articles
        .getByBitly(bitlyId)
        .execute();

      if (article) {
        const type = article.type === ArticleType.News ? 'news' : 'updates';
        this._router.navigate([`/${type}`, article.partialUrl]);
      }
    } catch (_) {
      // Do nothing
    }
  }
}
