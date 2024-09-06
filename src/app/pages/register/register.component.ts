import { Credentials, UsersService } from '../../services/user/users.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private userSubscription: Subscription | null = null;

  registerFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  userRegisterView: User = Object.assign(new User(), this.registerFormGroup.value);
  invalidCredentials = false;

  register(): void {
    const credentials: Credentials = this.registerFormGroup.value as Credentials;
    this.usersService.register(credentials).subscribe({
      next: (result: User | null | undefined) => {
        this.navigateLogin();
      },
      error: (error) => {
        if (error.error === "There is already an user with this email.") {
          this.invalidCredentials = true;
        } else {
          console.log(error);
        }
      }
    });
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    this.userSubscription = this.registerFormGroup.valueChanges.subscribe(() => {
      this.userRegisterView = Object.assign(new User(), this.registerFormGroup.value);
    });

    this.registerFormGroup.get('email')?.valueChanges.subscribe(() => {
      this.invalidCredentials = false;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
