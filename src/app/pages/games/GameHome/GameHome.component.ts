
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/user/users.service';

@Component({
  selector: 'app-game-home',
  standalone: true,
  templateUrl: './GameHome.component.html',
  styleUrls: ['./GameHome.component.scss']
})
export class GamesHomeComponent   {
  constructor(private router: Router, private usersService: UsersService) {
    console.log('GamesHome start');
  }
  navigateToquiz() {
    this.router.navigate(['games/quiz']);
  }
  navigateToGameConjugation() {
    this.router.navigate(['games/conjugation']);
  }

  logout(): void {

    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user_name');
    this.usersService.user.set(null);
    this.router.navigate(['/login']);
  }
}
