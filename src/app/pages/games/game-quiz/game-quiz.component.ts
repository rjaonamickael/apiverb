import { Component, OnInit } from '@angular/core';
import { verbFunctions } from '../../../functions/verb.functions';
import { CommonModule } from '@angular/common';
import { Verbe } from '../../../models/verbe.model';
import { NiveauQuiz } from '../../../utils/niveau-quiz.utils';

@Component({
  selector: 'app-game-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-quiz.component.html',
  styleUrls: ['./game-quiz.component.scss']
})
export class GameQuizComponent implements OnInit{
  private functions = new verbFunctions();

  niveauOptions = [
    { label: 'Facile', value: NiveauQuiz.FACILE },
    { label: 'Moyen', value: NiveauQuiz.MOYEN },
    { label: 'Difficile', value: NiveauQuiz.DIFFICILE }
  ];
  selectedNiveau: NiveauQuiz = NiveauQuiz.FACILE;

  randomVerbs:any;
  randomVerbslist:any;
  verbQty?:number;

  isLoading = true;

  constructor() {}
  

  async random(verbQty:number): Promise<void> {
    this.isLoading = true; // Début du chargement
    
    //Appel de la fonction random vers l'API pour avoir la liste des verbes
    this.randomVerbslist = await this.functions.getRandom(verbQty);

    //Création de la liste des verbes
    //On doit utiliser Promise.all pour attendre la résolution de toutes les promesses dans le tableau
    this.randomVerbs = await Promise.all(
      this.randomVerbslist.map(async (verbName: any) => {
        //Appel de la fonction getConjugation pour avoir les conjugaisons du verbe
        await this.functions.getConjugation(verbName);

        return this.functions.verbData;
      })
    );
    
    this.isLoading = false; // Fin du chargement
  }


  onNiveauChange(event: any) {
    this.selectedNiveau = event.target.value;
    this.random(this.selectedNiveau); // Appel de la fonction random avec la valeur du niveau
  }

  ngOnInit(): void {
    this.random(this.selectedNiveau);
  }
}
