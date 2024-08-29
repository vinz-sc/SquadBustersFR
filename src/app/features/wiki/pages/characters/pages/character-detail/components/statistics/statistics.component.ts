import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public damage: number | null = null;

  @Input()
  public fusionAbility: string | null = null;

  @Input()
  public fusionDamage: number | null = null;

  @Input()
  public fusionHealth: number | null = null;

  @Input()
  public health: number | null = null;
}
