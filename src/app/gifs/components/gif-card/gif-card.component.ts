import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../intefaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gif-card.component.html',
})
export class GifCardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) throw new Error('Method not implemented.');
  }
}
