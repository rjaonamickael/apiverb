import { VerbeAuxiliaire } from "../utils/auxiliaire.utils";
import { VerbeGroupe } from "../utils/groupe.utils";
import { VerbeType } from "../utils/type.utils";
import { ModeVerbe } from "./mode.verb";
import { NominaleVerb } from "./nominale.verb";

export class Verbe{
   isFavorite:boolean = false;
   nom:string = '';
   
   groupe:VerbeGroupe = VerbeGroupe.PREMIER;
   auxiliaire:VerbeAuxiliaire = VerbeAuxiliaire.AVOIR;
   type:VerbeType = VerbeType.AMBITRANSITIF; //Transitif ou intransitif

   regle:string = '';
   description:string = '';
   
   mode:ModeVerbe = new ModeVerbe();
   nominale:NominaleVerb = new NominaleVerb();
   

   constructor(){}
}