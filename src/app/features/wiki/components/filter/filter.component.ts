import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  @Input()
  public filter: string = '';

  @Input()
  public filterOptions: { [key: string]: string } = {};

  @Output()
  public filterChange: EventEmitter<string> = new EventEmitter();

  /* * * * * * * * * * * * * * * *\
  |*           GETTERS           *|
  \* * * * * * * * * * * * * * * */

  public get currentFilter(): string {
    return this.filterOptions[this.filter];
  }

  /* * * * * * * * * * * * * * * *\
  |*           SETTERS           *|
  \* * * * * * * * * * * * * * * */

  public set currentFilter(value: string) {
    this.filter = value;
    this.filterChange.emit(value);
  }
}
