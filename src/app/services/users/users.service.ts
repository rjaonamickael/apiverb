import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, catchError, map, tap } from 'rxjs';

export interface Credentials{
  email: string;
  name: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);
  private BASE_URL = 'https://french-verbs-fall-2023-app-ramym.ondigitalocean.app/v0/';

  user = signal< User | null | undefined>(undefined);

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  

  constructor() { }

  register(credentials: Credentials): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'users/', credentials, this.httpOptions).pipe(
      tap((response) => {
        console.log('Signup success:', response);
      }),
      catchError((error) => {
        console.error('Signup error:', error);
        throw error;
      })
    );
  }
}
