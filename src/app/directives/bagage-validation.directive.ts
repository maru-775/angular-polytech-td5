import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appBagageValidation]',
  standalone: true
})
export class BagageValidationDirective implements OnChanges {
  @Input() appBagageValidation: {classe: string, bagages: number} = {classe: 'STANDARD', bagages: 0};
  
  // Maximum allowed baggage by class according to Air France rules
  private limitesBagages = {
    'STANDARD': 1,
    'BUSINESS': 2,
    'PREMIUM': 3
  };
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appBagageValidation']) {
      this.validateBagages();
    }
  }
  
  private validateBagages(): void {
    const { classe, bagages } = this.appBagageValidation;
    const limiteMax = this.limitesBagages[classe as keyof typeof this.limitesBagages] || 1;
    
    // Reset background color
    this.renderer.setStyle(this.el.nativeElement, 'background-color', null);
    
    // If baggage count exceeds the limit for this class, set background to red
    if (bagages > limiteMax) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(255, 0, 0, 0.2)');
    }
  }
}
