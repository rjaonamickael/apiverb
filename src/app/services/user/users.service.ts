import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environment';

export interface Credentials{
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private http = inject(HttpClient);
  private BASE_URL = environment.BASE_URL + 'users/';
  private token: string | null = null;

  user = signal< User | null | undefined>(undefined);

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  

  constructor() { }

  register(credentials: Credentials): Observable<any> {
    return this.http.post<any>(this.BASE_URL + 'signup', credentials, this.httpOptions).pipe(
      tap((response) => {
        console.log('Signup success:', response);
      }),
      catchError((error : HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          console.log('An error occurred:'+ error.error.message);
        } else {
          // Erreur côté serveur
          console.log(`Backend returned code ${error.status}, body was:`, error.error);
          console.log('Full error object:'+ error); // Ajouter cette ligne pour plus de détails
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }

  login(credentials: Credentials): Observable<User | null | undefined> {
    return this.http.post(this.BASE_URL + 'login',credentials)
              .pipe(tap((result:any) => {
                //localStorage.clear();
                
                localStorage.setItem('x-access-token', result.token);
                localStorage.setItem('user_name', result.logged_user.name); //Pour récupérer le nom de l'utilisateur
                const user = Object.assign(new User(), result["user"]);
                this.user.set(user);
                return result;
              }
            ),map((result:any) => {
              return this.user();
            })
          )
  }

}
