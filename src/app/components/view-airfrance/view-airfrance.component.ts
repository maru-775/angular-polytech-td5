import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FiltresComponent } from '../filtres/filtres.component';
import { ListeVolsComponent } from '../liste-vols/liste-vols.component';
import { ListePassagersComponent } from '../liste-passagers/liste-passagers.component';
import { IFiltres } from '../../models/filtres.model';
import { VolService } from '../../services/vol.service';
import { Vol } from '../../models/vol.model';

@Component({
    selector: 'app-view-airfrance',
    standalone: true,
    imports: [FiltresComponent, ListeVolsComponent, ListePassagersComponent],
    templateUrl: './view-airfrance.component.html',
    styleUrls: ['./view-airfrance.component.scss']
})
export class ViewAirFranceComponent implements OnInit {
    // Les filtres actuels
    filtres: IFiltres | null = null;
    
    // La liste des vols récupérés
    vols: Vol[] = [];
    
    // Vol sélectionné pour afficher les passagers
    volSelectionne: Vol | null = null;

    // Type de vol (départ ou arrivée)
    typeVol: 'depart' | 'arrive' = 'depart';
    
    constructor(
        private volService: VolService,
        private route: ActivatedRoute
    ) {}
    
    ngOnInit(): void {
        // Récupérer le type de vol à partir des données de route
        this.route.data.subscribe(data => {
            console.log('Route data:', data);
            this.typeVol = data['type'] || 'depart';
            console.log('Type de vol:', this.typeVol);
        });
    }

    /**
     * Méthode appelée lorsque des filtres sont appliqués par l'utilisateur
     */
    onFiltresAppliques(filtres: IFiltres): void {
        this.filtres = filtres;
        this.volSelectionne = null; // Réinitialiser le vol sélectionné
        
        console.log(`Recherche de vols en ${this.typeVol === 'depart' ? 'départ' : 'arrivée'}`);
        
        // Appeler le service pour récupérer les vols qui correspondent aux filtres
        this.volService.getVolsByFiltres(filtres, this.typeVol).subscribe({
            next: (vols) => {
                this.vols = vols;
                console.log(`${this.vols.length} vols trouvés`);
            },
            error: (error) => {
                console.error('Erreur lors de la récupération des vols', error);
            }
        });
    }
    
    /**
     * Méthode appelée lorsqu'un vol est sélectionné dans la liste
     */
    onVolSelectionne(vol: Vol): void {
        this.volSelectionne = vol;
    }

    /**
     * Renvoie le titre à afficher en fonction du type de vol
     */
    getTitre(): string {
        return this.typeVol === 'depart' ? 'DECOLLAGES' : 'ATTERRISSAGES';
    }
}
