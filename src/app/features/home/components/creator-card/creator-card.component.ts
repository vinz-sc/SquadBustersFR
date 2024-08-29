import { Component, Input } from '@angular/core';
import { Creator } from '../../../../core/models/Creator';

@Component({
  selector: 'app-creator-card',
  templateUrl: './creator-card.component.html',
  styleUrl: './creator-card.component.scss',
})
export class CreatorCardComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public creator: Creator | null = null;
}
