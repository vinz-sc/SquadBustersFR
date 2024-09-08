import { Component, Input } from '@angular/core';
import { ModItem } from '@vinz-sc/squadbustersfr-api';

@Component({
  selector: 'app-mod-items',
  templateUrl: './mod-items.component.html',
  styleUrl: './mod-items.component.scss',
})
export class ModItemsComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public items: ModItem[] = [];
}
