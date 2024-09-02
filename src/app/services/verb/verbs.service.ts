import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerbsService {
  //private http = inject(HttpClient);
  private BASE_URL = 'https://french-verbs-fall-2023-app-ramym.ondigitalocean.app/v0/verbs/';
  private token: string | null = null;

  constructor(private http: HttpClient) {}


  //A modifier // pas encore terminé
  getVerbService(verb: string): Observable<any> {
    this.token =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pY2thZWwxMkBnbWFpbC5jb20iLCJ1aWQiOiI2NmQzZTc0YjI2ZmM2ZGYyYjExNmNmNjIiLCJleHAiOjE3Mjc3OTI3MDl9.HccLevRNPWuHpQ0tBWBXVVrPPRkABwXQw0_zrzkZj9s';
    //this.token = localStorage.getItem('x-access-token') ?? '';
    const headers = new HttpHeaders().set('x-access-token', this.token);
    //const assignedToUid = '66d3e74b26fc6df2b116cf62';
    const body = { verb};

    return this.http.post<any>(this.BASE_URL, body, { headers });
  }
}



  

