import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { VerbsService } from '../../services/verb/verbs.service';
import { Verbe } from '../../models/verbe.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  //private verbService = inject(VerbsService);
  verb: string = 'habiter';
  verbData: any; // Stocke les données du verbe
  errorMessage: string | null = null; // Gère les messages d'erreur
  isLoading: boolean = false; // Gère l'état de chargement
  isDataLoaded: boolean = false; // Indique si les données sont chargées
  isError: boolean = false; // Indique s'il y a une erreur
  private responseSubscription:Subscription | null = null;

  constructor(private verbService: VerbsService) {}

  // getVerb() {
  //   this.verbService.getVerbService('tester').subscribe(rep => {
  //     this.verbe.nom = rep.verb.verb;
  //     console.log('Verbe:', this.verbe.nom);  // Check result in component
  //   }, error => {
  //     console.error('Error:', error);  // Handle and log any errors
  //   });
  // }

  ngOnInit(): void {
    this.getConjugation();
  }

  getConjugation(): void {
    this.isLoading = true;  // Commence le chargement
    this.verbService.getVerbService(this.verb).subscribe({
      next: (data) => {
        console.log(data.verb.verb);
        this.verbData = data.verb; // Assigne les données à la variable verbData
        this.errorMessage = null; // Réinitialise le message d'erreur
        this.isLoading = false; // Termine le chargement
        
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des données.'; // Assigne le message d'erreur
        console.log(error.message); // Affiche l'erreur dans la console
        this.isLoading = true; // Termine le chargement même en cas d'erreur
      },
      complete: () => {
        console.log('Observable terminé'); // Cette fonction sera appelée lorsque l'observable est terminé
      }
    });
  }

  ngOnDestroy(): void {
    
  }
}
