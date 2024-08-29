import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-world-image-modal',
  templateUrl: './world-image-modal.component.html',
  styleUrl: './world-image-modal.component.scss',
})
export class WorldImageModalComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public imageUrl?: string;

  private _modal = inject(NgbActiveModal);

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public close(): void {
    this._modal.close();
  }
}
