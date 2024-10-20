import { Component, Input } from '@angular/core';
import { Gif } from '../../intefaces/gifs.interfaces';

@Component({
  selector: 'card-list',
  templateUrl: 'card-list.component.html',
})
export class CardListComponent {
  constructor() {}

  @Input()
  public gifs: Gif[] = [];
}
