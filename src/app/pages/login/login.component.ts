import { Credentials, UsersService } from './../../services/users/users.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private userSubscription:Subscription | null = null;
  

  loginFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  userLoginView:User = Object.assign(new User(),this.loginFormGroup.value);

  invalidCredentials = false;


  login(){
    this.usersService.login(this.loginFormGroup.value as Credentials).subscribe({
      next: (result :User | null | undefined) => {
        
        this.navigateHome();
      },
      error: error => {
        if(error.error = "Invalid Password."){
          this.invalidCredentials = true;
        }
        else{
          alert("erreur inconnue");
        }
        console.log(error);
      }
    })
  }

  navigateLogin() {
    this.router.navigate(['login']);
    }

  navigateHome() {
      this.router.navigate(['home']);
    }

  ngOnInit(): void {
      // S'abonner aux changements de valeur de l'ensemble du formulaire
      this.userSubscription = this.loginFormGroup.valueChanges.subscribe(data => {
        this.userLoginView = Object.assign(new User(), this.loginFormGroup.value);
      });
    
      // S'abonner aux changements de valeur de chaque champ pour réinitialiser invalidCredentials
      this.loginFormGroup.get('email')?.valueChanges.subscribe(() => {
        this.invalidCredentials = false;
      });
    
      this.loginFormGroup.get('password')?.valueChanges.subscribe(() => {
        this.invalidCredentials = false;
      });
    }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
