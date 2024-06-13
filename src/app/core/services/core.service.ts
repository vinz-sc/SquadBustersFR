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

  private readonly SESSION_THEME_KEY = 'squadbustersfr-theme';
  private readonly SESSION_COOKIE_KEY = 'squadbustersfr-cookies';

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

  public acceptCookies() {
    localStorage.setItem(this.SESSION_COOKIE_KEY, 'true');
  }

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
        'mateo26',
        'Mateo26__',
        '@Mateo26_',
        '@mateo26.crfr'
      ),
      new Creator(
        'Spartafail',
        'Spartafail',
        'Spartafail',
        '@spartafail',
        '@spartafailcoc'
      ),
      new Creator('Vadowki', 'vadowki', 'vadowki', '@VadowkiSB', '@vadowki'),
    ];
  }

  public get isCookiesAccepted(): boolean {
    return !!localStorage.getItem(this.SESSION_COOKIE_KEY);
  }

  public get preferredTheme(): 'light' | 'dark' | null {
    return localStorage.getItem(this.SESSION_THEME_KEY) as
      | 'light'
      | 'dark'
      | null;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set preferredTheme(value: 'light' | 'dark') {
    localStorage.setItem(this.SESSION_THEME_KEY, value);
  }
}
