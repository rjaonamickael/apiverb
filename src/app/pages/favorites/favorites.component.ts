
import { Component, OnInit } from '@angular/core';
import { verbFunctions } from '../../functions/verb.functions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {

  listVerbFavorites:any;
  private functions = new verbFunctions();

  async getAllFavorites():Promise <void> {
    this.listVerbFavorites = await this.functions.getAllFavorites();
    console.log("ok");
    console.log(this.listVerbFavorites);
  }

  ngOnInit():void {
    this.getAllFavorites();
  }



  



}
