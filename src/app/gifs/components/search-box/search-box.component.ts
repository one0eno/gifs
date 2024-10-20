import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `<h5>Buscar:</h5>
    <input
      type="text"
      class="form-control"
      placeholder="buscar gifs...."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />`,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService) {}

  searchTag() {
    const newTag: string = this.tagInput.nativeElement.value;

    this.gifService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
    console.log({ newTag });
  }
}
