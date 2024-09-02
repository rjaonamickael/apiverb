export enum VerbeGroupe{
   PREMIER = "1ᵉʳ groupe",
   DEUXIEME = "2ᵉᵐᵉ groupe",
   TROISIEME = "3ᵉᵐᵉ groupe"
}

export interface IVerbeGroupe{
   verbe: string,
   groupe: VerbeGroupe
}