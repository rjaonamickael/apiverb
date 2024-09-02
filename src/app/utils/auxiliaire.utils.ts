export enum VerbeAuxiliaire{
   AVOIR ="avoir",
   ETRE ="être"
}

export interface IVerbeAuxiliaire{
   verbe: string,
   auxiliaire: VerbeAuxiliaire
}


// export const MonsterTypeProperties : {[key: string]: IMonsterProperties} = {
//    [MonsterType.PLANT]: {
//       imageUrl: 'assets/images/plant.png',
//       color: 'rgb(0, 255, 0)' 
//    },
//    [MonsterType.ELECTRIC]: {
//       imageUrl: 'assets/images/electric.png',
//       color: 'rgb(255, 255, 0)' 
//    },
//    [MonsterType.WATER]: {
//       imageUrl: 'assets/images/water.png',
//       color: 'rgb(0, 155, 255)' 
//    },
//    [MonsterType.FIRE]: {
//       imageUrl: 'assets/images/fire.png',
//       color: 'rgb(255, 0, 0)' 
//    }
// }