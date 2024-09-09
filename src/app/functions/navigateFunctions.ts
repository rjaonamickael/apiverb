
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export class NavigateFunctions{
    private router = inject(Router);

    toLogin() {
        this.router.navigate(['/login']);
    }

    toRegister() {
        this.router.navigate(['/register']);
    }

    toHome() {
        this.router.navigate(['/home']);
    }

    toConjugation() {
        this.router.navigate(['/conjugation']);
    }

    toFavorites() {
        this.router.navigate(['/favorites']);
    }

    toGamesHome() {
        this.router.navigate(['/games']);
    }

    toGamesQuiz() {
        this.router.navigate(['/games/quiz']);
    }

    toGamesConjugation() {
        this.router.navigate(['/games/conjugation']);
    }

}