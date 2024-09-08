import { Component } from '@angular/core';

import { CoreService } from '../../../../core/services/core.service';

@Component({
  selector: 'app-dev-resume',
  templateUrl: './dev-resume.component.html',
  styleUrl: './dev-resume.component.scss',
})
export class DevResumeComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _coreService: CoreService) {}

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get age(): number {
    return new Date().getFullYear() - 1999;
  }

  public get logoUrl(): string {
    return `assets/images/developer/${this._coreService.preferredTheme}.png`;
  }
}
