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
export class LoginComponent implements OnDestroy {
  
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private userSubscription:Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  invalidCredentials = false;


  login(){
    this.usersService.login(this.loginFormGroup.value as Credentials).subscribe({
      next: (result :User | null | undefined) => {
        
        this.navigateHome();
      },
      error: error => {
        console.log(error.message);
        this.invalidCredentials = true;
      }
    })
  }

  navigateLogin() {
    this.router.navigate(['login']);
    }

  navigateHome() {
      this.router.navigate(['home']);
    }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
