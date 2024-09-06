import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { HeaderLogedComponent } from "./components/header-loged/header-loged.component";
import { FooterComponent } from "./components/footer/footer.component";
import { UserFunctions } from './functions/user.functions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderLogedComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  userFunction =  new UserFunctions();
  title = 'projet1MickaelSirine';


}
