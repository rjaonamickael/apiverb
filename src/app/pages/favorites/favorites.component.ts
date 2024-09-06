import { Component, OnInit } from '@angular/core';
import { verbFunctions } from '../../functions/verb.functions';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  listVerbFavorites: any[] = [];
  private functions = new verbFunctions();

  
  async getAllFavorites(): Promise<void> {
    try {
      this.listVerbFavorites = await this.functions.getAllFavorites();
      console.log('Loaded favorites:', this.listVerbFavorites);
    
      this.listVerbFavorites.forEach((verbe, index) => {
        console.log(`Favorite ${index}:`, verbe);
      });
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }


  ngOnInit(): void {
    this.getAllFavorites();
  }

  deleteVerbFavorites(id: string): void {
    this.functions.deleteFavorites(id);
    this.listVerbFavorites = this.listVerbFavorites.filter(verbe => verbe.uid !== id);
  }
}
