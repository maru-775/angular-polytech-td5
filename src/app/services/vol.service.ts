import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IVolDto, Vol } from './../models/vol.model';
import { IFiltres } from '../models/filtres.model';

@Injectable({
  providedIn: 'root'
})
export class VolService {

  constructor(private http: HttpClient) { }

  /**
   * Récupération de la liste des vols en départ d'un aéroport donné en paramètre et selon un intervalle de temps donné.
   * Open Sky REST API
   * https://openskynetwork.github.io/opensky-api/rest.html#departures-by-airport
   */
  getVolsDepart(code: string, debut: number, fin: number): Observable<Vol[]> {
    return this.http.get<any>(`https://opensky-network.org/api/flights/departure?airport=${code}&begin=${debut}&end=${fin}`).pipe(
      map((response) => response
        .map((dto: IVolDto) => new Vol(dto))
    ));
  }

  /**
   * Récupération de la liste des vols en arrivée à un aéroport donné en paramètre et selon un intervalle de temps donné.
   * Open Sky REST API
   * https://openskynetwork.github.io/opensky-api/rest.html#arrivals-by-airport
   */
  getVolsArrive(code: string, debut: number, fin: number): Observable<Vol[]> {
    return this.http.get<any>(`https://opensky-network.org/api/flights/arrival?airport=${code}&begin=${debut}&end=${fin}`).pipe(
      map((response) => response
        .map((dto: IVolDto) => new Vol(dto))
    ));
  }

  /**
   * Convertit les filtres en paramètres pour l'API VolService
   * L'API attend des timestamps UNIX en secondes
   */
  getVolsByFiltres(filtres: IFiltres, type: 'depart' | 'arrive' = 'depart'): Observable<Vol[]> {
    // Conversion des dates en timestamps UNIX (secondes)
    const debutTimestamp = Math.floor(filtres.debut.getTime() / 1000);
    const finTimestamp = Math.floor(filtres.fin.getTime() / 1000);
    
    // Appel à l'API avec le code de l'aéroport et les timestamps selon le type (départ ou arrivée)
    if (type === 'arrive') {
      return this.getVolsArrive(filtres.aeroport.icao, debutTimestamp, finTimestamp);
    } else {
      return this.getVolsDepart(filtres.aeroport.icao, debutTimestamp, finTimestamp);
    }
  }
}
