import { Component, inject, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnDestroy {

  private usersService = inject(UsersService);
  private router = inject(Router);
 


  navigateToConjugation() {
    this.router.navigate(['conjugation']);
  }

  navigateToAllFavorites() {
    this.router.navigate(['favorites']);
  }


  logout(): void {

    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user_name');


    this.usersService.user.set(null);


    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void { }

}
