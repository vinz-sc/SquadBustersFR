import { Injectable } from '@angular/core';
import { SquadBustersFRApi } from '@vinz-sc/squadbustersfr-api';

import { environment } from '../../../environments/environment';

import { Creator } from '../models/Creator';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          CONSTANTS                          *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly SESSION_KEY = 'squadbustersfr-theme';

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private readonly _api: SquadBustersFRApi;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor() {
    this._api = new SquadBustersFRApi(environment.apiUrl);
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get api(): SquadBustersFRApi {
    return this._api;
  }

  public get creators(): Creator[] {
    return [
      new Creator(
        'Mateo26',
        'https://x.com/Mateo26__',
        null,
        'https://www.tiktok.com/@mateo26.crfr'
      ),
      new Creator(
        'Spartafail',
        'https://x.com/Spartafail',
        'https://www.youtube.com/@spartafail',
        'https://www.tiktok.com/@spartafailcoc'
      ),
      new Creator(
        'Vadowki',
        'https://x.com/vadowki',
        'https://www.youtube.com/@VadowkiSB',
        'https://www.tiktok.com/@vadowki'
      ),
    ];
  }

  public get preferredTheme(): 'light' | 'dark' | null {
    return localStorage.getItem(this.SESSION_KEY) as 'light' | 'dark' | null;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set preferredTheme(value: 'light' | 'dark') {
    localStorage.setItem(this.SESSION_KEY, value);
  }
}
