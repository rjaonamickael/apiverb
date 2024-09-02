import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VerbsService {
  private http = inject(HttpClient);
  private BASE_URL = 'https://french-verbs-fall-2023-app-ramym.ondigitalocean.app/v0/verbs/';
  private token: string | null = null;

  constructor( http: HttpClient) {}


  //A modifier // pas encore terminé
  getVerb(verb: string): Observable<any> {
    this.token = localStorage.getItem('x-access-token') ?? '';
    const headers = new HttpHeaders({ 'x-access-token': this.token });
    const body = { verb };

    console.log('Request intercepted:', body);
    console.log('header intercepted:', headers);

    return this.http.post(this.BASE_URL, body, { headers })
      .pipe(
        tap((result) => {
          console.log('Response intercepted:', result);
          // Vous pouvez effectuer des opérations supplémentaires avec la réponse ici
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            // Erreur spécelle du client
            console.log('An error occurred:', error.error.message);
          } else {
            // Erreur spécelle du serveur
            console.log(`Backend returned code ${error.status}, body was:`, error.error);
          }
          return throwError(() => new Error('Something bad happened; please try again later.'));
        })
      );
  }
}



  

