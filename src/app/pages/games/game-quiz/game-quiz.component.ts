import { Component } from '@angular/core';
import { verbFunctions } from '../../../functions/verb.functions';

@Component({
  selector: 'app-game-quiz',
  standalone: true,
  imports: [],
  templateUrl: './game-quiz.component.html',
  styleUrl: './game-quiz.component.scss'
})
export class GameQuizComponent {
  private functions = new verbFunctions();

  randomVerbs:any;
  verbQty:number = 1;

  constructor() {}

  random(verbQty:number) {
    this.randomVerbs = this.functions.getRandom(verbQty);
  }
}
