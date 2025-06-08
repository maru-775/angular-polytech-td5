/**
 * Random User Generator
 * https://randomuser.me/documentation
 */
export interface IPassagerDto {
  name: {
    title: string,
    first: string,
    last: string
  },
  picture: {
    large: string,
    medium: string,
    thumbnail: string
  },
  email: string
}

export enum ClasseVol {
  STANDARD,
  BUSINESS,
  PREMIUM
}

export interface IPassager {
  nom: string;
  image: string;
  classeVol: string;
  nbBagagesSoute: number;
  email: string;
}

export class Passager implements IPassager {
  nom: string;
  image: string;
  classeVol: string;
  nbBagagesSoute: number;
  email: string;

  constructor(dto: IPassagerDto) {
    this.nom = dto.name.first + ' ' + dto.name.last;
    this.image = dto.picture.medium;
    this.classeVol = getRandomClasseVol();
    this.nbBagagesSoute = getRandomNombreBagages();
    this.email = dto.email;
  }
}

export function getRandomClasseVol(): string {
  // index entre 0 et 3 exclus
  return ClasseVol[Math.floor(Math.random() * 3)];
}

export function getRandomNombreBagages(): number {
  // index entre 0 et 4 exclus
  return Math.floor(Math.random() * 4);
}
