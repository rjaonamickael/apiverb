export enum VerbeType{
   TRANSITIF ="Transitif",
   INTRANSITIF ="Intransitif",
   AMBITRANSITIF ="Ambitransitif"
}

export interface IVerbeType{
   verbe: string,
   type: VerbeType
}