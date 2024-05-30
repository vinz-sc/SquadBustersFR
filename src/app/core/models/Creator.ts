export class Creator {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _username: string;
  private readonly _twitter: string | null;
  private readonly _youTube: string | null;
  private readonly _tikTok: string | null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(
    username: string,
    twitter: string | null,
    youTube: string | null,
    tikTok: string | null
  ) {
    // Inputs
    {
      this._username = username;
      this._twitter = twitter;
      this._youTube = youTube;
      this._tikTok = tikTok;
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  get username(): string {
    return this._username;
  }

  get logoPath(): string {
    return `assets/images/creators/${this._username.toLowerCase()}.png`;
  }

  get twitter(): string | null {
    return this._twitter;
  }

  get youTube(): string | null {
    return this._youTube;
  }

  get tikTok(): string | null {
    return this._tikTok;
  }
}
