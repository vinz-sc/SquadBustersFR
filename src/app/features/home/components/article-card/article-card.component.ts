import { Component, Input, OnInit } from '@angular/core';
import { Article } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.scss',
})
export class ArticleCardComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _headerUrl: string | null = null;

  @Input()
  public article?: Article;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  async ngOnInit(): Promise<void> {
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

  public get isHeaderImage(): boolean {
    return !!this._headerUrl;
  }

  public get headerUrl(): string {
    return this._headerUrl || '';
  }

  public get fullUrl(): string {
    return `/${this._baseUrl}/${this.article?.partialUrl}`;
  }

  public get publicationDate(): string {
    return this.article?.publishedAt.format('DD/MM/YYYY') || '';
  }

  public get youTubeThumbnailUrl(): string {
    if (!this.article?.headerYoutubeId) {
      return '';
    }

    return `https://img.youtube.com/vi/${this.article?.headerYoutubeId}/maxresdefault.jpg`;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  private get _baseUrl(): string {
    switch (this.article?.type) {
      case 'News':
        return '/news';
      case 'SneakPeek':
        return '/updates';
      default:
        return '/';
    }
  }
}
