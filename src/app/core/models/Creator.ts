export class Creator {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _username: string;
  private readonly _code: string;
  private readonly _twitterId: string | null;
  private readonly _youTubeId: string | null;
  private readonly _tikTokId: string | null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    username: string,
    code: string,
    twitterId: string | null,
    youTubeId: string | null,
    tikTokId: string | null
  ) {
    // Inputs
    {
      this._username = username;
      this._code = code;
      this._twitterId = twitterId;
      this._youTubeId = youTubeId;
      this._tikTokId = tikTokId;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get username(): string {
    return this._username;
  }

  public get logoPath(): string {
    return `assets/images/creators/${this._username.toLowerCase()}.png`;
  }

  public get storeUrl(): string {
    return `https://store.supercell.com/fr?boost=${this._code}`;
  }

  public get tikTok(): string | null {
    return `https://tiktok.com/${this._tikTokId}`;
  }

  public get twitter(): string | null {
    return `https://x.com/${this._twitterId}`;
  }

  public get youTube(): string | null {
    return `https://youtube.com/${this._youTubeId}`;
  }
}
