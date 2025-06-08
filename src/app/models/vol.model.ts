import { COMPAGNIES } from './../constants/compagnie.constant';
import { IPassager } from './passager.model';

/**
 * OpenSky REST API Flight DTO
 * https://openskynetwork.github.io/opensky-api/rest.html#
*/
export interface IVolDto {
  icao24: string;
  firstSeen: number;
  estDepartureAirport: string;
  lastSeen: number;
  estArrivalAirport: string;
  callsign: string;
  estDepartureAirportHorizDistance: number;
  estDepartureAirportVertDistance: number;
  estArrivalAirportHorizDistance: number;
  estArrivalAirportVertDistance: number;
  departureAirportCandidatesCount: number;
  arrivalAirportCandidatesCount: number;
}


export interface IVol {
 icao: string;
 matricule: string;
 compagnie: string;
 aeroportDepart: string;
 aeroportArrivee: string;
}

export class Vol implements IVol {
  icao: string;
  matricule: string;
  compagnie: string;
  aeroportDepart: string;
  aeroportArrivee: string;
  dateDepart: Date;
  dateArrivee: Date;
  passagers: IPassager[] = [];  constructor(dto: IVolDto) {
    this.icao = dto.icao24;
    this.matricule = dto.callsign?.trim() || '';
    this.compagnie = this.determinerCompagnie(dto.callsign);
    this.aeroportDepart = dto.estDepartureAirport || 'Inconnu';
    this.aeroportArrivee = dto.estArrivalAirport || 'Inconnu';
    
    // Validation des timestamps et création des dates
    const firstSeenTimestamp = typeof dto.firstSeen === 'number' && dto.firstSeen > 0 ? dto.firstSeen * 1000 : null;
    const lastSeenTimestamp = typeof dto.lastSeen === 'number' && dto.lastSeen > 0 ? dto.lastSeen * 1000 : null;
    
    this.dateDepart = firstSeenTimestamp ? new Date(firstSeenTimestamp) : new Date();
    this.dateArrivee = lastSeenTimestamp ? new Date(lastSeenTimestamp) : new Date();
    
    // Vérification supplémentaire pour s'assurer que les dates sont valides
    if (isNaN(this.dateDepart.getTime())) {
      this.dateDepart = new Date(); // Fallback à la date actuelle
    }
    if (isNaN(this.dateArrivee.getTime())) {
      this.dateArrivee = new Date(); // Fallback à la date actuelle
    }
    
    this.genererPassagers();
  }
  private determinerCompagnie(callsign: string): string {
    if (!callsign) {
      return 'Inconnue';
    }
    const prefixe = callsign.substring(0, 3).toUpperCase();
    if (prefixe === 'AFR') return 'Air France';
    if (prefixe === 'HOP') return 'Air France Hop';
    if (prefixe === 'TVF') return 'Transavia France';
    return 'Inconnue';
  }
  
  private genererPassagers(): void {
    // Génération aléatoire simulée de passagers
    // Dans une application réelle, ces données proviendraient d'une API
    this.passagers = [];
  }
}
