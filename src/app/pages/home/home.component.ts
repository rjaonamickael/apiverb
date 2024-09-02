import { Component, inject, OnDestroy } from '@angular/core';
import { VerbsService } from '../../services/verb/verbs.service';
import { Verbe } from '../../models/verbe.model';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  private verbService = inject(VerbsService);
  private verbe: Verbe = new Verbe();

  constructor() { }

  getVerb() {
    this.verbService.getVerb('tester').subscribe(rep => {
      this.verbe.nom = rep.verb;
      console.log('Verbe:', this.verbe.nom);  // Check result in component
    }, error => {
      console.error('Error:', error);  // Handle and log any errors
    });
  }

  ngOnDestroy(): void { }
}
