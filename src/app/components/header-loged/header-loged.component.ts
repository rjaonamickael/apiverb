import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header-loged',
  standalone: true,
  imports: [],
  templateUrl: './header-loged.component.html',
  styleUrl: './header-loged.component.scss'
})
export class HeaderLogedComponent {
  private usersService = inject(UsersService);
  private router = inject(Router);

  constructor(){}

  logout(): void {

    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user_name');


    this.usersService.user.set(null);

    this.router.navigate(['/login']);
  }


}
