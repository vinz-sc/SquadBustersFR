import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleType } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-full-article',
  templateUrl: './full-article.component.html',
  styleUrl: './full-article.component.scss',
})
export class FullArticleComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _article: Article | null = null;
  private _headerUrl: string | null = null;
  private _loading: boolean = true;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _coreService: CoreService,
    private readonly _sanitizer: DomSanitizer
  ) {}

  async ngOnInit(): Promise<void> {
    const url = this._activatedRoute.snapshot.params['partialUrl'];
    const currentPath = this._activatedRoute.snapshot.url[0].path;

    try {
      if (currentPath === 'updates') {
        this._article = await this._coreService.api.articles
          .getByUrl(ArticleType.SneakPeek, url)
          .execute();
      } else if (currentPath === 'news') {
        this._article = await this._coreService.api.articles
          .getByUrl(ArticleType.News, url)
          .execute();
      }
    } catch (_) {
      // Do nothing
    }

    if (this._article) {
      this._headerUrl = this._article.headerImageUrl;
    }

    this._loading = false;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get article(): Article | null {
    return this._article;
  }

  public get backUrl(): string {
    switch (this.article?.type) {
      case ArticleType.News:
        return '/news';
      case ArticleType.SneakPeek:
        return '/updates';
      default:
        return '';
    }
  }

  public get content(): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(
      this._article?.content || ''
    );
  }

  public get headerUrl(): string {
    return this._headerUrl || '';
  }

  public get isHeaderImage(): boolean {
    return !!this._headerUrl;
  }

  public get loading(): boolean {
    return this._loading;
  }

  public get publishedAt(): string {
    return `Publié le ${this.article?.publishedAt.format('DD/MM/YYYY')}`;
  }

  public get youTubeUrl(): SafeUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.article?.headerYoutubeId}`
    );
  }
}
