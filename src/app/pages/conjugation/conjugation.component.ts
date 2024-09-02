import { Component, inject } from '@angular/core';
import { VerbsService } from '../../services/verb/verbs.service';
import { Verbe } from '../../models/verbe.model';

@Component({
  selector: 'app-conjugation',
  standalone: true,
  imports: [],
  templateUrl: './conjugation.component.html',
  styleUrl: './conjugation.component.scss'
})
export class ConjugationComponent {
  private verbService = inject(VerbsService);
  private verbe: Verbe = new Verbe();
  verb: string = 'habiter';

  verbData: any ;

  constructor() {}

  getConjugation(): void {
    this.verbService.getVerbService(this.verb).subscribe({
      next: (data) => {
        console.log(data.verb.verb);
        this.verbData = data.verb;
        
      },
      error: (error) => {
        console.log(error);
      } 
    });
  }

  ngOnDestroy(): void {
    
  }

}

