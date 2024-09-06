import { HttpHeaders } from "@angular/common/http";

export class AuthHeader{
    
    getHeaders(): HttpHeaders {
        const token = localStorage.getItem('x-access-token') ?? '';
        
        return new HttpHeaders({
          'x-access-token': token,
          'Content-Type': 'application/json'
        });
    }
}