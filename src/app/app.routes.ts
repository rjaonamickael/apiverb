import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ConjugationComponent } from './pages/conjugation/conjugation.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { GamesHomeComponent } from './pages/games/games-home/games-home.component';
import { GameQuizComponent } from './pages/games/game-quiz/game-quiz.component';
import { GameConjugationComponent } from './pages/games/game-conjugation/game-conjugation.component';


export const routes: Routes = [
   {path:'',redirectTo:"home",pathMatch:"full"},
   {path: 'register', component:RegisterComponent},
   {path: 'login', component:LoginComponent},   
   {path: 'home', component:HomeComponent},
   {path: 'conjugation', component:ConjugationComponent},
   {path: 'favorites', component:FavoritesComponent},
   {path: 'games', component:GamesHomeComponent},
   {path: 'games/quiz', component:GameQuizComponent},
   {path: 'games/conjugation', component:GameConjugationComponent},
   { path:'**',component: HomeComponent}
];
