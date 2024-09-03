export enum VerbeType{
   TRANSITIF ="Transitif",
   INTRANSITIF ="Intransitif",
   AMBITRANSITIF ="Ambitransitif",
   INCONNUE = "Inconnue par l'application"
}

export interface IVerbeType{
   verbe: string,
   type: VerbeType
}