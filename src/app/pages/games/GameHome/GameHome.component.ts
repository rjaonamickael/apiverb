
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/user/users.service';
import { NavigateFunctions } from '../../../functions/navigateFunctions';
import { UserFunctions } from '../../../functions/user.functions';

@Component({
  selector: 'app-game-home',
  standalone: true,
  templateUrl: './GameHome.component.html',
  styleUrls: ['./GameHome.component.scss']
})
export class GamesHomeComponent   {
  navigateFunctions = new NavigateFunctions();
  userFunctions = new UserFunctions();

  constructor() {

  }

  navigateToquiz() {
    this.navigateFunctions.toGamesQuiz();
  }
  navigateToGameConjugation() {
    this.navigateFunctions.toGamesConjugation();
  }

  logout(): void {
    this.userFunctions.logout();
  }
}
