import { Component, inject, OnDestroy } from '@angular/core';
import { VerbsService } from '../../services/verb/verbs.service';
import { Verbe } from '../../models/verbe.model';
import { UsersService } from '../../services/user/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  private verbService = inject(VerbsService);
  private usersService = inject(UsersService);
  private router = inject(Router);
  private verbe: Verbe = new Verbe();

  constructor() { }

 
  getVerb() {
    this.verbService.getVerb('tester').subscribe(rep => {
      this.verbe.nom = rep.verb;
      console.log('Verbe:', this.verbe.nom);
    }, error => {
      console.error('Error:', error);
    });
  }


  logout(): void {

    localStorage.removeItem('x-access-token');
    localStorage.removeItem('user_name');


    this.usersService.user.set(null);


    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void { }
}
