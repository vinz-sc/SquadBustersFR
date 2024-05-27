import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public _isDarkTheme: boolean = true;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  // TODO: Inject CoreService to get and save user's theme preference
  // constructor(private readonly _coreService: any) {}

  ngOnInit(): void {
    const deviceMode: MediaQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    this._isDarkTheme = deviceMode.matches;
    this._updateBodyTheme();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get isDarkTheme(): boolean {
    return this._isDarkTheme;
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set isDarkTheme(value: boolean) {
    this._isDarkTheme = value;
    this._updateBodyTheme();
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _updateBodyTheme(): void {
    document.body.classList.remove(
      this._isDarkTheme ? 'sb-light-theme' : 'sb-dark-theme'
    );
    document.body.classList.add(
      this._isDarkTheme ? 'sb-dark-theme' : 'sb-light-theme'
    );
  }
}
