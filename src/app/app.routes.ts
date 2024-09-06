import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ConjugationComponent } from './pages/conjugation/conjugation.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { GamesHomeComponent } from './pages/games/GameHome/GameHome.component';
import { GameQuizComponent } from './pages/games/game-quiz/game-quiz.component';
import { GameConjugationComponent } from './pages/games/game-conjugation/game-conjugation.component';
import { isLoggedGuard } from './security/guards/is-logged.guard';


export const routes: Routes = [
   {path:'',redirectTo:"home",pathMatch:"full"},
   {
      path: 'register', 
      component:RegisterComponent},
   {
      path: 'login', 
      component:LoginComponent},
   {
      path: 'home', 
      component:HomeComponent,
      canActivate:[isLoggedGuard]
   },
   {
      path: 'conjugation', 
      component:ConjugationComponent,
      canActivate:[isLoggedGuard]
   },
   {
      path: 'favorites', 
      component:FavoritesComponent,
      canActivate:[isLoggedGuard]
   },
   {
      path: 'games', 
      children:[
         {path:"", component:GamesHomeComponent},
         {path:"quiz", component:GameQuizComponent},
         {path:"conjugation", component:GameConjugationComponent}  
      ],
      canActivate:[isLoggedGuard]
   },
   { 
      path:'**',
      component: HomeComponent}
];
