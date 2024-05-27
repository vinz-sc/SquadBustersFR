import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, ThemeSwitcherComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(allIcons),
    RouterModule,
  ],
  exports: [FooterComponent, HeaderComponent],
})
export class SharedModule {}
