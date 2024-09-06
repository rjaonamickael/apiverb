import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../../environment';
import { AuthHeader } from '../../security/headers/auth.headers';

@Injectable({
  providedIn: 'root'
})
export class VerbsService {
  private http = inject(HttpClient);

  private url = environment.BASE_URL + 'verbs/';
  private headers = new AuthHeader();
  
  constructor() {}

  getVerbService(verb: string): Observable<any> {
    const headers = this.headers.getHeaders();
    const body = { verb };

    return this.http.post(this.url, body, { headers });
  }

  addFavoriteVerbService(verb: string): Observable<any> {
    const headers = this.headers.getHeaders();
    const body = { verb };
    return this.http.post(`${this.url}favorites`, body, { headers });
  }

  getAllFavoritesVerbService(): Observable<any> {
    const headers = this.headers.getHeaders();
    return this.http.get(`${this.url}favorites/all`, { headers });
  }

  deleteFavoritesVerbService(id: string): Observable<any> {
    const headers = this.headers.getHeaders();
    return this.http.delete(`${this.url}favorites/${id}`, { headers });
  }

  getRandomVerbService(quantity: number): Observable<any> {
    const headers = this.headers.getHeaders();
    const body = { quantity };
    return this.http.post(`${this.url}random`, body, { headers });
  }
}
