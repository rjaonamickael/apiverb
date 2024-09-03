import { Credentials, UsersService } from '../../services/user/users.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private userSubscription: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  userLoginView: User = Object.assign(new User(), this.loginFormGroup.value);

  invalidCredentials = false;

  login(): void {
    this.usersService.login(this.loginFormGroup.value as Credentials).subscribe({
      next: (result: User | null | undefined) => {
        this.navigateHome();
      },
      error: error => {
        if (error.error === "Invalid Password.") {
          this.invalidCredentials = true;
        } else {
          alert("Erreur inconnue");
        } 
        console.log(error);
      }
    });
  }

  navigateHome() {
    this.router.navigate(['home']);
  }

  navigateRegister() {
    this.router.navigate(['register']);
  }




  ngOnInit(): void {
    this.userSubscription = this.loginFormGroup.valueChanges.subscribe(() => {
      this.userLoginView = Object.assign(new User(), this.loginFormGroup.value);
    });

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
