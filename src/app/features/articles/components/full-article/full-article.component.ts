import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Article } from '@vinz-sc/squadbustersfr-api';

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
    this._article = await this._coreService.api.articles
      .getByUrl(url)
      .execute();

    if (this.article && this.article.headerIcon) {
      this._headerUrl = await this.article.generateImageUrl();
    }
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
      case 'News':
        return '/news';
      case 'SneakPeek':
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

  public get publishedAt(): string {
    return `Publié le ${this.article?.publishedAt.format('DD/MM/YYYY')}`;
  }

  public get youTubeUrl(): SafeUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.article?.headerYoutubeId}`
    );
  }
}
