
// src/app/pages/home/home.component.ts
import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderLogedComponent } from "../../components/header-loged/header-loged.component";
import { NavigateFunctions } from '../../functions/navigateFunctions';
import { UserFunctions } from '../../functions/user.functions';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderLogedComponent]
})

export class HomeComponent  {
  navigateFunctions = new NavigateFunctions();
  userFunctions = new UserFunctions();

  navigateToConjugation() {
    this.navigateFunctions.toConjugation();
  }

  navigateToAllFavorites() {
    this.navigateFunctions.toFavorites();
  }

  navigateToGamesHome() {
    this.navigateFunctions.toGamesHome();
  }

  logout(): void {
    this.userFunctions.logout();
  }


}
