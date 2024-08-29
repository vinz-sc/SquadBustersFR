import { Component, inject, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorldMap } from '@vinz-sc/squadbustersfr-api';

import { WorldImageModalComponent } from '../world-image-modal/world-image-modal.component';

@Component({
  selector: 'app-world-maps',
  templateUrl: './world-maps.component.html',
  styleUrl: './world-maps.component.scss',
})
export class WorldMapsComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _modalService = inject(NgbModal);

  @Input()
  public maps: WorldMap[] = [];

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public openMap(url: string): void {
    const modalRef = this._modalService.open(WorldImageModalComponent, {
      centered: true,
      size: 'lg',
    });

    modalRef.componentInstance.imageUrl = url;
  }
}
