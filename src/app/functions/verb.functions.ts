import { inject } from "@angular/core";
import { VerbsService } from "../services/verb/verbs.service";
import { VerbeType } from "../utils/type.utils";
import { TempsVerbe } from "../models/temps.verb";
import { Verbe } from "../models/verbe.model";
import { VerbeAuxiliaire } from "../utils/auxiliaire.utils";
import { VerbeGroupe } from "../utils/groupe.utils";

export class verbFunctions {
 private verbService = inject(VerbsService);

 modes:any;
 verbData:Verbe = new Verbe() ;
 listFavoritesData:any;

 async getConjugation(verbToConjugate: string): Promise<any> {
  try {

    const response = await new Promise<any>((resolve, reject) => {
      this.verbService.getVerbService(verbToConjugate).subscribe({
        next: (rep) => resolve(rep),
        error: (error) => reject(error),
      });
    });

    this.verbData = mapJSONToVerbe(response);

    this.modes = [
      { name: 'Indicatif', data: this.verbData?.mode.indicatif },
      { name: 'Conditionnel', data: this.verbData?.mode.conditionnel },
      { name: 'Subjonctif', data: this.verbData?.mode.subjonctif },
      { name: 'Impératif', data: this.verbData?.mode.imperatif }
    ];

  } catch (error) {
    console.error(error);
  }
}

async addFavorite(verbData: any): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      this.verbService.addFavoriteVerbService(verbData).subscribe({
        next: (rep) => resolve(rep),
        error: (error) => reject(error),
      });
    });

  } catch (error) {

    console.error(error);
  }
}

async getAllFavorites(): Promise<any[]> {
  try {

    const response = await new Promise<any[]>((resolve, reject) => {
      this.verbService.getAllFavoritesVerbService().subscribe({
        next: (rep) => {
          if (rep && rep.verbs) {
            resolve(rep.verbs);
          } else {
            reject('Unexpected response structure');
          }
        },
        error: (error) => {
          console.error('Error fetching favorites:', error);
          reject(error);
        },
      });
    });

    return response;

  } catch (error) {
    // Log the error and return an empty array in case of failure
    console.log('Failed to fetch favorites:', error);
    return [];
  }
}

async deleteFavorites(id:string): Promise<void> {
  try {
    await new Promise<any>((resolve, reject) => {
      this.verbService.deleteFavoritesVerbService(id).subscribe({
        next: (rep) => resolve(rep),
        error: (error) => reject(error),
      });
    });

  } catch (error) {
    console.log(error);

  }
}

async getRandom(quantity: number): Promise<any[]> {
  try {
    const response = await new Promise<any[]>((resolve, reject) => {
      this.verbService.getRandomVerbService(quantity).subscribe({
        next: (rep) => resolve(rep.verbs),
        error: (error) => reject(error),
      });
    });

    return response;
  } catch (error) {
    console.error('Error fetching random verbs:', error);
    return [];
  }
}


}


 function mapJSONToVerbe(data: any): Verbe {
  let verbe = new Verbe();

  // Mapping des propriétés principales
  verbe.nom         = majusc(data.verb.infinitive.present);               // Titre du verbe
  verbe.groupe      = groupe(data.verb.wordVerbGroup);                    // 1er ou 2nde ou 3ème groupe
  verbe.auxiliaire  = auxiliaire(data.verb.wordConjugateWithWhichVerb);   // Auxiliaire avoir ou être
  verbe.type        = Type(data.verb.wordVerbType);                       // Transitif ou instransitif ou ambi
  verbe.regle       = majusc(data.verb.wordConjugateRule);                // Règle spécifique au verbe


  // Mapping des modes verbaux
  verbe.mode.indicatif    = mapMode(data.verb.indicatif);
  verbe.mode.conditionnel = mapMode(data.verb.conditionnel);
  verbe.mode.subjonctif   = mapMode(data.verb.subjonctif);
  verbe.mode.imperatif    = mapMode(data.verb.imperatif);

  // Mapping des formes nominales (infinitif, participe)
  verbe.nominale = {
      infinitif: {
          present: data.verb.infinitive.present,
          passe: data.verb.infinitive.passe
      },
      participe: {
          present: data.verb.participe.present,
          passe: data.verb.participe.passe
      }
  };

  return verbe;
}

function mapMode(modeData: any): TempsVerbe[] {
  let tenses: TempsVerbe[] = [];

  for (let tenseKey in modeData) {
    let tense = new TempsVerbe();
    tense.titre = tenseKey; // Titre basé sur le key, ajuster si nécessaire

    tense.je = modeData[tenseKey]['indicatifPresentI']
               || modeData[tenseKey]['conditionnelPasse1reFormeI']
               || modeData[tenseKey]['conditionnelPasse2eFormeI']
               || modeData[tenseKey]['conditionnelPresentI']
               || modeData[tenseKey]['subjonctifPresentI']
               || modeData[tenseKey]['indicatifFuturAnterieurI']
               || modeData[tenseKey]['indicatifFuturSimpleI']
               || modeData[tenseKey]['indicatifImparfaitI']
               || modeData[tenseKey]['indicatifPasseAnterieurI']
               || modeData[tenseKey]['indicatifPasseComposeI']
               || modeData[tenseKey]['indicatifPasseSimpleI']
               || modeData[tenseKey]['indicatifPlusQueParfaitI']
               || modeData[tenseKey]['subjonctifImparfaitI']
               || modeData[tenseKey]['subjonctifPasseI']
               || modeData[tenseKey]['subjonctifPlusQueParfaitI'];

    tense.tu = modeData[tenseKey]['indicatifPresentYou']
                || modeData[tenseKey]['conditionnelPasse1reFormeYou']
                || modeData[tenseKey]['conditionnelPasse2eFormeYou']
                || modeData[tenseKey]['conditionnelPresentYou']
               || modeData[tenseKey]['subjonctifPresentYou']
                || modeData[tenseKey]['imperatifPresentFirst']
                || modeData[tenseKey]['imperatifPasseFirst']
               || modeData[tenseKey]['indicatifFuturAnterieurYou']
               || modeData[tenseKey]['indicatifFuturSimpleYou']
               || modeData[tenseKey]['indicatifImparfaitYou']
               || modeData[tenseKey]['indicatifPasseAnterieurYou']
               || modeData[tenseKey]['indicatifPasseComposeYou']
               || modeData[tenseKey]['indicatifPasseSimpleYou']
               || modeData[tenseKey]['indicatifPlusQueParfaitYou']
               || modeData[tenseKey]['subjonctifImparfaitYou']
               || modeData[tenseKey]['subjonctifPasseYou']
               || modeData[tenseKey]['subjonctifPlusQueParfaitYou'];

    tense.il = modeData[tenseKey]['indicatifPresentHeSheIt']
                || modeData[tenseKey]['conditionnelPasse1reFormeHeSheIt']
                || modeData[tenseKey]['conditionnelPasse2eFormeHeSheIt']
                || modeData[tenseKey]['conditionnelPresentHeSheIt']
               || modeData[tenseKey]['subjonctifPresentHeSheIt']
               || modeData[tenseKey]['indicatifFuturAnterieurHeSheIt']
               || modeData[tenseKey]['indicatifFuturSimpleHeSheIt']
               || modeData[tenseKey]['indicatifImparfaitHeSheIt']
               || modeData[tenseKey]['indicatifPasseAnterieurHeSheIt']
               || modeData[tenseKey]['indicatifPasseComposeHeSheIt']
               || modeData[tenseKey]['indicatifPasseSimpleHeSheIt']
               || modeData[tenseKey]['indicatifPlusQueParfaitHeSheIt']
               || modeData[tenseKey]['subjonctifImparfaitHeSheIt']
               || modeData[tenseKey]['subjonctifPasseHeSheIt']
               || modeData[tenseKey]['subjonctifPlusQueParfaitHeSheIt'];

    tense.nous = modeData[tenseKey]['indicatifPresentWe']
                  || modeData[tenseKey]['conditionnelPasse1reFormeWe']
                  || modeData[tenseKey]['conditionnelPasse2eFormeWe']
                  || modeData[tenseKey]['conditionnelPresentWe']
                  || modeData[tenseKey]['imperatifPasseSecond']
                 || modeData[tenseKey]['subjonctifPresentWe']
                 || modeData[tenseKey]['imperatifPresentSecond']
                 || modeData[tenseKey]['indicatifFuturAnterieurWe']
                 || modeData[tenseKey]['indicatifFuturSimpleWe']
                 || modeData[tenseKey]['indicatifImparfaitWe']
                 || modeData[tenseKey]['indicatifPasseAnterieurWe']
                 || modeData[tenseKey]['indicatifPasseComposeWe']
                 || modeData[tenseKey]['indicatifPasseSimpleWe']
                 || modeData[tenseKey]['indicatifPlusQueParfaitWe']
                 || modeData[tenseKey]['subjonctifImparfaitWe']
                 || modeData[tenseKey]['subjonctifPasseWe']
                 || modeData[tenseKey]['subjonctifPlusQueParfaitWe'];

    tense.vous = modeData[tenseKey]['conditionnelPasse1reFormeYouAll']
                  || modeData[tenseKey]['conditionnelPasse2eFormeYouAll']
                  || modeData[tenseKey]['conditionnelPresentYouAll']
                 || modeData[tenseKey]['indicatifFuturAnterieurYouAll']
                 || modeData[tenseKey]['indicatifFuturSimpleYouAll']
                 || modeData[tenseKey]['indicatifImparfaitYouAll']
                 || modeData[tenseKey]['indicatifPasseAnterieurYouAll']
                 || modeData[tenseKey]['indicatifPasseComposeYouAll']
                 || modeData[tenseKey]['indicatifPasseSimpleYouAll']
                 || modeData[tenseKey]['indicatifPlusQueParfaitYouAll']
                 || modeData[tenseKey]['indicatifPresentYouAll']
                 || modeData[tenseKey]['subjonctifImparfaitYouAll']
                 || modeData[tenseKey]['subjonctifPasseYouAll']
                 || modeData[tenseKey]['subjonctifPlusQueParfaitYouAll']
                 || modeData[tenseKey]['subjonctifPresentYouAll']
                 || modeData[tenseKey]['imperatifPresentThird']
                 || modeData[tenseKey]['imperatifPasseThird'];

    tense.ils = modeData[tenseKey]['indicatifPresentThey']
                || modeData[tenseKey]['conditionnelPasse1reFormeThey']
                || modeData[tenseKey]['conditionnelPasse2eFormeThey']
                || modeData[tenseKey]['conditionnelPresentThey']
                || modeData[tenseKey]['subjonctifPresentThey']
                || modeData[tenseKey]['indicatifFuturAnterieurThey']
                || modeData[tenseKey]['indicatifFuturSimpleThey']
                || modeData[tenseKey]['indicatifImparfaitThey']
                || modeData[tenseKey]['indicatifPasseAnterieurThey']
                || modeData[tenseKey]['indicatifPasseComposeThey']
                || modeData[tenseKey]['indicatifPasseSimpleThey']
                || modeData[tenseKey]['indicatifPlusQueParfaitThey']
                || modeData[tenseKey]['subjonctifImparfaitThey']
                || modeData[tenseKey]['subjonctifPasseThey']
                || modeData[tenseKey]['subjonctifPlusQueParfaitThey'];


    //Mettre la première lettre en majuscule
    tense.je = tense.je? majusc(tense.je) : tense.je;
    tense.tu = tense.tu? majusc(tense.tu) : tense.je;
    tense.il = tense.il? majusc(tense.il) : tense.je;
    tense.nous = tense.nous? majusc(tense.nous) : tense.je;
    tense.vous = tense.vous? majusc(tense.vous) : tense.je;
    tense.ils = tense.ils? majusc(tense.ils) : tense.je;

    tenses.push(tense);
  }

  return tenses;
}

function Type(text: string): VerbeType{
  if (text.toUpperCase().includes("TRANSITIF") && text.toUpperCase().includes("INTRANSITIF")) {
    return VerbeType.AMBITRANSITIF;
  }
  else if(text.toUpperCase().includes("INTRANSITIF")){
    return VerbeType.INTRANSITIF;
  }
  else if(text.toUpperCase().includes("TRANSITIF")){
    return VerbeType.TRANSITIF;
  }
  else{
    return VerbeType.INCONNUE;
  }
}

function groupe(text: string):VerbeGroupe{
  if (text.toUpperCase().includes("1")) {
    return VerbeGroupe.PREMIER;
  }
  else if(text.toUpperCase().includes("1")){
    return VerbeGroupe.DEUXIEME;
  }
  else{
    return VerbeGroupe.TROISIEME;
  }
}

function auxiliaire(text: string):VerbeAuxiliaire{
  if(text.toUpperCase().includes("AVOIR")){
    return VerbeAuxiliaire.AVOIR;
  }
  else{
    return VerbeAuxiliaire.ETRE;
  }
}

function majusc(text: string): string {

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}


