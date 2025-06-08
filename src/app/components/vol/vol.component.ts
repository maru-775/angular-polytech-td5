import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vol } from '../../models/vol.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-vol',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
    templateUrl: './vol.component.html',
    styleUrls: ['./vol.component.scss']
})
export class VolComponent {
    @Input() vol!: Vol;
    @Input() actif: boolean = false;
    @Input() type: 'depart' | 'arrive' = 'depart';
    @Output() volSelectionne = new EventEmitter<Vol>();
    
    /**
     * Méthode appelée lorsque l'utilisateur clique sur la carte du vol
     */
    selectionnerVol(): void {
        this.volSelectionne.emit(this.vol);
    }
    
    /**
     * Retourne le chemin de l'image de la compagnie aérienne
     */    
    getLogoCompagnie(): string {
        // Nettoyer et normaliser le nom de la compagnie pour correspondre au nom du fichier
        const nomFichier = this.vol.compagnie.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ').trim();
        return `./assets/${nomFichier}.png`;
    }

    /**
     * Vérifie si une date est valide
     */
    isValidDate(date: Date | null | undefined): boolean {
        return date instanceof Date && !isNaN(date.getTime());
    }
    
    /**
     * Retourne l'icône à utiliser en fonction du type de vol
     */
    getFlightIcon(): string {
        return this.type === 'depart' ? 'flight_takeoff' : 'flight_land';
    }
}
