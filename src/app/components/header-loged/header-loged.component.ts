import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/user/users.service';
import { Router } from '@angular/router'; 
import { UserFunctions } from '../../functions/user.functions';
import {MatMenuModule} from '@angular/material/menu';
import { NavigateFunctions } from '../../functions/navigateFunctions';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-loged',
  standalone: true,
  imports: [MatMenuModule,MatButtonModule],
  templateUrl: './header-loged.component.html',
  styleUrl: './header-loged.component.scss'
})
export class HeaderLogedComponent {
  navigateFunctions = new NavigateFunctions();
  userFunctions = new UserFunctions();

  constructor(){}

  logout() {
    this.userFunctions.logout();
  }

}
