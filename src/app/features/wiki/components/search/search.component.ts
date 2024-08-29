import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                          PROPERTIES                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  private _search: Subject<string> = new Subject();

  @Input()
  public placeholder: string = '';

  @Output()
  public searched: EventEmitter<RegExp> = new EventEmitter();

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                        CONSTRUCTORS                         *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  ngOnInit(): void {
    // Define the behavior of the search input
    this._search //
      .pipe(distinctUntilChanged())
      .subscribe((search) => {
        // When the search input changes, emit a regex filter
        this.searched.emit(new RegExp(search, 'i'));
      });
  }

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
  |*                           PUBLIC                            *|
  \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

  public onSearchInput(event: Event): void {
    const element = event.target as HTMLInputElement;

    // Emit the value of the search input
    this._search.next(element.value);
  }
}
