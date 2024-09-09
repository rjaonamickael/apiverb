import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { Router } from '@angular/router'; 
import { UserFunctions } from '../../functions/user.functions';

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
  userFunctions = new UserFunctions();

  constructor(){}

  logout() {
    this.userFunctions.logout();
  }

}
