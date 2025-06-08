import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Vol } from '../../models/vol.model';
import { CommonModule } from '@angular/common';
import { VolComponent } from '../vol/vol.component';

@Component({
    selector: 'app-liste-vols',
    standalone: true,
    imports: [CommonModule, VolComponent],
    templateUrl: './liste-vols.component.html',
    styleUrls: ['./liste-vols.component.scss']
})
export class ListeVolsComponent {
    @Input() vols: Vol[] = [];
    @Input() type: 'depart' | 'arrive' = 'depart';
    @Output() volSelectionne = new EventEmitter<Vol>();
    
    // Vol actuellement sélectionné
    volActif: Vol | null = null;
    
    /**
     * Méthode appelée lorsque l'utilisateur sélectionne un vol
     */
    onSelectVol(vol: Vol): void {
        this.volActif = vol;
        this.volSelectionne.emit(vol);
    }
}
