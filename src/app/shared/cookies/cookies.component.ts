import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { take } from 'rxjs';

import { CoreService } from '../../core/services/core.service';

import { ModalCookiesComponent } from '../modal-cookies/modal-cookies.component';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrl: './cookies.component.scss',
})
export class CookiesComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _modalService = inject(NgbModal);

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  constructor(private readonly _coreService: CoreService) {}

  ngOnInit(): void {
    if (!this._coreService.isCookiesAccepted) {
      this.openModal();
    }
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public openModal() {
    const modalRef = this._modalService.open(ModalCookiesComponent, {
      backdrop: this._coreService.isCookiesAccepted ? true : 'static',
      centered: true,
      keyboard: false,
    });

    modalRef.closed.pipe(take(1)).subscribe(() => {
      this._coreService.acceptCookies();
    });
  }
}
