import { Component } from '@angular/core';
import { verbFunctions } from '../../../functions/verb.functions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-conjugation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-conjugation.component.html',
  styleUrl: './game-conjugation.component.scss'
})

export class GameConjugationComponent {
  private functions = new verbFunctions();
  randomVerbs: string[] = [];
  verbQty: number = 5;
  userAnswers: string[] = [];
  score: number = 0;
  conjugations: any[] = [];

  constructor() {}

  random() {
    console.log('Fetching random verbs...');
    this.functions.getRandom(this.verbQty)
      .then((response: any) => {
        console.log('API Response:', response);
        this.randomVerbs = response || [];
        if (this.randomVerbs.length > 0) {
          this.generateQuiz();
        } else {
          console.warn('No verbs received from API.');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des verbes :', error);
      });
  }

  async generateQuiz() {
    if (this.randomVerbs.length > 0) {
      console.log('Generating quiz questions...');
      this.userAnswers = Array(this.randomVerbs.length).fill('');
      this.conjugations = [];
      for (const verb of this.randomVerbs) {
        console.log(`Fetching conjugation for '${verb}'...`);
        await this.functions.getConjugation(verb);
        console.log('Conjugation data:', this.functions.verbData); 
        this.conjugations.push(this.functions.verbData);
        if (!this.functions.verbData || Object.keys(this.functions.verbData).length === 0) {
          console.error(`Failed to fetch correct conjugation for '${verb}'.`);
        }
      }
    }
}


getCorrectConjugation(verb: string): string {
  const conjugation = this.conjugations.find(conj => conj.nom.toLowerCase() === verb.toLowerCase());
  if (conjugation && conjugation.mode.indicatif.length > 0) {
    const correct = conjugation.mode.indicatif[0].je || '';
    console.log(`Correct conjugation for '${verb}': ${correct}`);
    return correct;
  }
  console.log(`No correct conjugation found for '${verb}'`);
  return '';
}


  checkAnswer(userAnswer: string, correctAnswer: string): boolean {
    const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    console.log(`Checking answer: User Answer - '${userAnswer}', Correct Answer - '${correctAnswer}', Is Correct: ${isCorrect}`); // Ajoutez ce log
    return isCorrect;
  }

  submitQuiz() {
    this.score = 0;
    this.randomVerbs.forEach((verb, index) => {
      const userAnswer = this.userAnswers[index]?.trim().toLowerCase() || '';
      const correctAnswer = this.getCorrectConjugation(verb)?.trim().toLowerCase() || '';
      const isCorrect = this.checkAnswer(userAnswer, correctAnswer);
      if (isCorrect) {
        this.score++;
      }
    });
    console.log(`Votre score: ${this.score}/${this.randomVerbs.length}`);
    alert(`Votre score: ${this.score}/${this.randomVerbs.length}`);
  }
}
