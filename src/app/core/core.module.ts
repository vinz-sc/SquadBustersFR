import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHtmlToPlainTextPipe } from './pipes/safe-html-to-plain-text.pipe';

@NgModule({
  declarations: [SafeHtmlToPlainTextPipe],
  imports: [CommonModule],
  exports: [SafeHtmlToPlainTextPipe],
})
export class CoreModule {}
