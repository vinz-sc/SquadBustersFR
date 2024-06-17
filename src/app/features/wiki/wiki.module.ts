import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WikiRoutingModule } from './wiki-routing.module';
import { WikiComponent } from './wiki.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [WikiComponent],
  imports: [CommonModule, SharedModule, WikiRoutingModule],
})
export class WikiModule {}
