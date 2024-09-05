import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})

export class VerbsService {
  private http = inject(HttpClient);
  private url = environment.BASE_URL + 'verbs/';
  private token: string | null = null;

  constructor() {}


  getVerbService(verb: string): Observable<any> {
    this.token = localStorage.getItem('x-access-token') ?? '';
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    });
    const body = { verb};

    return this.http.post(this.url, body, { headers });
  }

  addFavoriteVerbService(verb: string): Observable<any> {
    this.token = localStorage.getItem('x-access-token') ?? '';
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    });
    const body = {verb};

    return this.http.post(this.url + 'favorites', body, { headers });

  }

  getAllFavoritesVerbService(): Observable<any> {
    this.token = localStorage.getItem('x-access-token') ?? '';
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    });

    return this.http.get(this.url + 'favorites/all', { headers });
  }

  deleteFavoritesVerbService(id: string): Observable<any> {
    this.token = localStorage.getItem('x-access-token') ?? '';
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    });
  
    return this.http.delete(this.url + 'favorites/'+`${id}`, { headers });
  }

  getRandomVerbService(quantity: number): Observable<any> {
    this.token = localStorage.getItem('x-access-token') ?? '';
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    });
    const body = {quantity};

    return this.http.post(this.url + 'random', body, { headers });

  }


}
