export enum NiveauQuiz{
    FACILE      = 3,
    MOYEN       = 5,
    DIFFICILE   = 7
 }
 
 export interface INiveauQuiz{
    verbe: string,
    niveau: NiveauQuiz
 }
 