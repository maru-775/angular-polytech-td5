import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPassager, Passager, IPassagerDto } from '../models/passager.model';

@Injectable({
  providedIn: 'root'
})
export class PassagerService {

  constructor(private http: HttpClient) { }

  /**
   * Récupération des passagers pour un vol donné
   * @param icao Identifiant ICAO du vol
   * @returns Observable de la liste des passagers
   */
  getPassagers(icao: string): Observable<IPassager[]> {
    // On souhaite récupérer 20 passagers pour chaque appel
    const nbPassagers = 20;
      // On utilise l'API Random User Generator pour simuler des passagers
    // On récupère les attributs "name", "picture" et "email"
    // On utilise l'icao comme seed pour avoir des passagers cohérents pour le même vol
    const url = `https://randomuser.me/api/?results=${nbPassagers}&inc=name,picture,email&seed=${icao}`;
    
    return this.http.get<any>(url).pipe(
      map(response => {
        // Conversion des IPassagerDto en objets Passager
        return response.results.map((dto: IPassagerDto) => new Passager(dto));
      })
    );
  }
}
