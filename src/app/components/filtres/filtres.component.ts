import { Component, LOCALE_ID, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { AEROPORTS } from './../../constants/aeroport.constant';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { IAeroport } from '../../models/aeroport.model';
import { ThreeDayRangeSelectionStrategy } from '../../date-adapter';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import {MatCommonModule} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IFiltres } from '../../models/filtres.model';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-filtres',
    standalone: true,
    templateUrl: './filtres.component.html',
    styleUrls: ['./filtres.component.scss'],
    imports: [MatIconModule, MatButtonModule, MatInputModule, FormsModule,
        MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatCommonModule, CommonModule],
    providers: [
        provideNativeDateAdapter(),
        { provide: LOCALE_ID, useValue: 'fr' },
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: ThreeDayRangeSelectionStrategy,
        },
    ],
    encapsulation: ViewEncapsulation.None
})
export class FiltresComponent {

  /**
   * La liste des aéroports disponibles est une constante,
   * on n'utilise que les principaux aéroports français pour l'instant
   */
  aeroports: IAeroport[] = AEROPORTS;
  
  /**
   * Événement émis lorsque l'utilisateur applique les filtres
   */
  @Output() filtresAppliques = new EventEmitter<IFiltres>();

  // Variables pour stocker les valeurs sélectionnées
  aeroportSelectionne: IAeroport | null = null;
  dateDebut: Date | null = null;
  dateFin: Date | null = null;

  /**
   * Méthode appelée lorsque l'utilisateur clique sur le bouton "Appliquer"
   */
  appliquerFiltres(): void {
    // Vérifier que les deux champs sont renseignés
    if (this.aeroportSelectionne && this.dateDebut && this.dateFin) {
      // Émettre l'événement avec les valeurs sélectionnées
      this.filtresAppliques.emit({
        aeroport: this.aeroportSelectionne,
        debut: this.dateDebut,
        fin: this.dateFin
      });
    }
  }
}
