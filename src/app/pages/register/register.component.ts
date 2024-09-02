import { Credentials, UsersService } from '../../services/user/users.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private usersService = inject(UsersService);
  private userSubscription:Subscription | null = null;

  registerFormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  userRegisterView:User = Object.assign(new User(),this.registerFormGroup.value);

  invalidCredentials = false;


  register(): void {
    const credentials: Credentials = this.registerFormGroup.value as Credentials;
    this.usersService.register(credentials).subscribe({
      next: (result: User | null | undefined) => {
        this.navigateLogin();
      },
      error: (error) => {
        if(error.error = "There is already an user with this email."){
          this.invalidCredentials = true;
        }
        else{
          console.log(error);
        }
      }
    });
  }

  navigateLogin() {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    // S'abonner aux changements de valeur de l'ensemble du formulaire
    this.userSubscription = this.registerFormGroup.valueChanges.subscribe(data => {
      this.userRegisterView = Object.assign(new User(), this.registerFormGroup.value);
    });
  
    // S'abonner aux changements de valeur du champs email pour réinitialiser invalidCredentials
    this.registerFormGroup.get('email')?.valueChanges.subscribe(() => {
      this.invalidCredentials = false;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
