
import { Component, OnInit } from '@angular/core';
import { verbFunctions } from '../../functions/verb.functions';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {


  private functions = new verbFunctions();

  ngOnInit(): void {
    this.functions.getAllFavorites();
    console.log("ok");
  }

  



}
