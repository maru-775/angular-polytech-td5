import { Component, Input, OnInit } from '@angular/core';
import { IPassager } from '../../models/passager.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { ClasseVolDirective } from '../../directives/classe-vol.directive';
import { BagageValidationDirective } from '../../directives/bagage-validation.directive';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-passager',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule, 
        MatIconModule, 
        MatBadgeModule,
        ClasseVolDirective,
        BagageValidationDirective,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatTooltipModule
    ],
    templateUrl: './passager.component.html',
    styleUrls: ['./passager.component.scss']
})
export class PassagerComponent implements OnInit {
    @Input() passager!: IPassager;
    @Input() editMode: boolean = false;
    @Input() showPhotos: boolean = false;
    
    classeVolOptions = ['STANDARD', 'BUSINESS', 'PREMIUM'];
    
    // Limits by class for baggage
    private limitesBagages = {
        'STANDARD': 1,
        'BUSINESS': 2,
        'PREMIUM': 3
    };
    
    ngOnInit(): void {
        if (!this.passager.classeVol) {
            this.passager.classeVol = 'STANDARD';
        }
    }
    
    /**
     * Retourne la classe CSS à appliquer en fonction de la classe du vol
     */    getClasseStyle(): string {
        switch (this.passager.classeVol) {
            case 'BUSINESS':
                return 'classe-business';
            case 'PREMIUM':
                return 'classe-premium';
            default:
                return 'classe-standard';
        }
    }
    
    /**
     * Vérifie si le nombre de bagages est valide pour la classe du passager
     */
    isBagageValid(): boolean {
        const limiteMax = this.limitesBagages[this.passager.classeVol as keyof typeof this.limitesBagages] || 1;
        return this.passager.nbBagagesSoute <= limiteMax;
    }
    
    /**
     * Retourne le texte d'information sur les limites de bagages
     */
    getLimiteBagageInfo(): string {
        const limiteMax = this.limitesBagages[this.passager.classeVol as keyof typeof this.limitesBagages] || 1;
        return `Limite pour classe ${this.passager.classeVol}: ${limiteMax} bagage(s)`;
    }
}
