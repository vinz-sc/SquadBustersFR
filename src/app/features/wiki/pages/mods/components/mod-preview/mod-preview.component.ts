import { Component, Input, OnInit } from '@angular/core';
import { Mod, World } from '@vinz-sc/squadbustersfr-api';

import { CoreService } from '../../../../../../core/services/core.service';

@Component({
  selector: 'app-mod-preview',
  templateUrl: './mod-preview.component.html',
  styleUrl: './mod-preview.component.scss',
})
export class ModPreviewComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _world: World | null = null;

  @Input()
  public mod: Mod | null = null;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _coreService: CoreService) {}

  async ngOnInit(): Promise<void> {
    if (this.mod && this.mod.worldId) {
      this._world = await this._coreService.api.worlds
        .getById(this.mod.worldId)
        .execute();
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get link(): string {
    return `/wiki/mods/${this.mod?.partialUrl}`;
  }

  public get worldIconUrl(): string {
    return this._world?.iconUrl ?? '';
  }

  public get worldName(): string {
    return this._world?.name ?? '';
  }
}
