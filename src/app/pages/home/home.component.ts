// src/app/pages/home/home.component.ts
import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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

  ngOnDestroy(): void { }
}
