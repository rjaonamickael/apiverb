import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})

export class VerbsService {
  private http = inject(HttpClient);
  private url = environment.BASE_URL;
  private token: string | null = null;

  constructor() {}


  getVerbService(verb: string): Observable<any> {
    this.token = localStorage.getItem('x-access-token') ?? '';
    const headers = new HttpHeaders({
      'x-access-token': this.token,
      'Content-Type': 'application/json'
    });
    const assignedToUid = '66d3e74b26fc6df2b116cf62';
    
    const body = { verb, assignedToUid};

    return this.http.post(this.url, body, { headers });
  }
}



  

