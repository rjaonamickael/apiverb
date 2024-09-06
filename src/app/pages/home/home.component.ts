
// src/app/pages/home/home.component.ts
import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderLogedComponent } from "../../components/header-loged/header-loged.component";


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderLogedComponent]
})

export class HomeComponent implements OnDestroy {
  private router = inject(Router);

  navigateToConjugation() {
    this.router.navigate(['conjugation']);
  }

  navigateToAllFavorites() {
    this.router.navigate(['favorites']);
  }

  navigateToGamesHome() {
    this.router.navigate(['games']);
  }

  logout(): void {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user_name');
    this.router.navigate(['/login']);
  }


}
