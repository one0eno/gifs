import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../intefaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apikey: string = 'sgxCa7bhrqgLCvxonYosYWD77OwZwEyk';
  private url: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.LoadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private LoadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;

    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('limit', 50)
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.url}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
        console.log(resp);
      });

    // fetch(
    //   'https://api.giphy.com/v1/gifs/search?api_key=sgxCa7bhrqgLCvxonYosYWD77OwZwEyk&q=valorant&limit=10'
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => console.log(data));

    //esto ya no deberia ejecutarse
    //this._tagsHistory.unshift(tag);
  }
}
