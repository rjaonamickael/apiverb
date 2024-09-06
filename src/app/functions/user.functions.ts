import { inject } from "@angular/core";
import { UsersService } from "../services/user/users.service";
import { Router } from "@angular/router";

export class UserFunctions{
 private userServices = inject(UsersService);
 private router = inject(Router);
 token?:string;

    logout(): void {

        localStorage.removeItem('x-access-token');
        localStorage.removeItem('user_name');

        this.userServices.user.set(null);

        this.router.navigate(['/login']);
    }
    
    //Fonction pour vérifier si un utilisateur s'est connecté en vérifiant le token dans le localStorage
    isLogged():boolean {
        if (typeof window !== 'undefined' && window.localStorage) {
            const token = localStorage.getItem('x-access-token');
            return !!token;
          }
          return false;
    }
}