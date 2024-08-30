import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NewlineToParagraphPipe } from './pipes/newline-to-paragraph.pipe';
import { SafeHtmlToPlainTextPipe } from './pipes/safe-html-to-plain-text.pipe';

@NgModule({
  declarations: [NewlineToParagraphPipe, SafeHtmlToPlainTextPipe],
  imports: [CommonModule],
  exports: [NewlineToParagraphPipe, SafeHtmlToPlainTextPipe],
})
export class CoreModule {}
