import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Vol } from '../../models/vol.model';
import { CommonModule } from '@angular/common';
import { IPassager } from '../../models/passager.model';
import { PassagerComponent } from '../passager/passager.component';
import { PassagerService } from '../../services/passager.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-liste-passagers',
    standalone: true,
    imports: [
        CommonModule, 
        PassagerComponent, 
        MatSlideToggleModule, 
        FormsModule, 
        MatButtonModule, 
        MatIconModule
    ],
    templateUrl: './liste-passagers.component.html',
    styleUrls: ['./liste-passagers.component.scss']
})
export class ListePassagersComponent implements OnChanges {
    @Input() vol: Vol | null = null;
    passagers: IPassager[] = [];
    loading: boolean = false;
    editMode: boolean = false;
    showPhotos: boolean = false;
    
    constructor(private passagerService: PassagerService) {}
    
    ngOnChanges(changes: SimpleChanges): void {
        // Si le vol a changé et qu'un vol est sélectionné
        if (changes['vol'] && this.vol) {
            this.chargerPassagers();
        }
    }
    
    /**
     * Charge les passagers du vol sélectionné
     * Pour ce TD, nous simulons les passagers avec l'API Random User Generator
     */    chargerPassagers(): void {
        if (!this.vol) return;
        
        this.loading = true;
        
        // Utilisation du service pour récupérer exactement 20 passagers
        // avec le paramètre seed correspondant à l'icao du vol
        this.passagerService.getPassagers(this.vol.icao).subscribe({
            next: (passagers: IPassager[]) => {
                this.passagers = passagers;
                
                // Mise à jour des passagers du vol
                if (this.vol) {
                    this.vol.passagers = this.passagers;
                }
                
                this.loading = false;
            },
            error: (error: any) => {
                console.error('Erreur lors du chargement des passagers', error);
                this.loading = false;
            }
        });
    }
}
