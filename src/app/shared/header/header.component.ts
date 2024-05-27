import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _isMenuOpen: boolean = false;

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public closeMenu(): void {
    if (this._isMobile && this._isMenuOpen) {
      this.toggleMenu();
    }
  }

  public toggleMenu(): void {
    this._isMenuOpen = !this._isMenuOpen;
    document.body.style.overflow = this._isMenuOpen ? 'hidden' : '';
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event: any): void {
    if (event.target.innerWidth > 991 && this._isMenuOpen) {
      this.toggleMenu();
    }
  }

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PRIVATE                           *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private get _isMobile(): boolean {
    return window.innerWidth < 992;
  }
}
