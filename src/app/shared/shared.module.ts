import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  bootstrapDiscord,
  bootstrapList,
  bootstrapMoonStarsFill,
  bootstrapSunFill,
  bootstrapTwitterX,
  bootstrapXLg,
} from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';

import { CookiesComponent } from './cookies/cookies.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModalCookiesComponent } from './modal-cookies/modal-cookies.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SeparatorComponent } from './separator/separator.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

@NgModule({
  declarations: [
    CookiesComponent,
    FooterComponent,
    HeaderComponent,
    ModalCookiesComponent,
    NotFoundComponent,
    ThemeSwitcherComponent,
    SeparatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    NgIconsModule.withIcons({
      bootstrapDiscord,
      bootstrapList,
      bootstrapMoonStarsFill,
      bootstrapSunFill,
      bootstrapTwitterX,
      bootstrapXLg,
    }),
    RouterModule,
  ],
  exports: [
    CookiesComponent,
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    SeparatorComponent,
  ],
})
export class SharedModule {}
