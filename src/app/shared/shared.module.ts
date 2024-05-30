import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  bootstrapList,
  bootstrapMoonStarsFill,
  bootstrapSunFill,
  bootstrapXLg,
} from '@ng-icons/bootstrap-icons';
import { NgIconsModule } from '@ng-icons/core';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SeparatorComponent } from './separator/separator.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    ThemeSwitcherComponent,
    SeparatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgIconsModule.withIcons({
      bootstrapList,
      bootstrapMoonStarsFill,
      bootstrapSunFill,
      bootstrapXLg,
    }),
    RouterModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NotFoundComponent,
    SeparatorComponent,
  ],
})
export class SharedModule {}
