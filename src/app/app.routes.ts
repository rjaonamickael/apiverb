import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
   {path:'',redirectTo:"register",pathMatch:"full"},
   {path: 'register', component:RegisterComponent},
   {path: 'login', component:LoginComponent},
   {path: 'home', component:HomeComponent}
];
