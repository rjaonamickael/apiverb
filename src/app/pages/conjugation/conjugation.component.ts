
import { verbFunctions } from './../../functions/verb.functions';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Verbe } from '../../models/verbe.model';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Subscription } from 'rxjs';
import { VerbsService } from '../../services/verb/verbs.service';


@Component({
  selector: 'app-conjugation',
  standalone: true,

  imports: [CommonModule,MatExpansionModule,FormsModule,MatListModule,MatIconModule],

  templateUrl: './conjugation.component.html',
  styleUrl: './conjugation.component.scss'
})
export class ConjugationComponent {


  private verbFunctions = new verbFunctions();
  @Input() verbeConjuge!: Verbe;
  verbToConjugate: string = '';
  verbData:any;

  modes:any;
  favorites: Set<string> = new Set();

  constructor() {}


  async addFavorite(verb:string){
    await this.verbFunctions.addFavorite(verb);
  }

  async getConjugation(verbToConjugate:string): Promise<void> {

    await this.verbFunctions.getConjugation(verbToConjugate);


    this.verbData = this.verbFunctions.verbData;
    this.modes = this.verbFunctions.modes;

  }

  isFavorite(verbData: any): boolean {
    return this.favorites.has(verbData.nom);
  }

  toggleFavorite(verbData: any): void {
    if (this.isFavorite(verbData)) {
      this.favorites.delete(verbData.nom);
    } else {
      this.favorites.add(verbData.nom);
    }
  }

}

