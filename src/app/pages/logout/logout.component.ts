import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/user/users.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router, private usersService: UsersService) {}

  logout(): void {

    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user_name');


    this.usersService.user.set(null);


    this.router.navigate(['/login']);
  }
}
