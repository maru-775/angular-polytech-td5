import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appClasseVol]',
  standalone: true
})
export class ClasseVolDirective implements OnChanges {
  @Input() appClasseVol: string = '';
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appClasseVol']) {
      this.updateColor();
    }
  }
  
  private updateColor(): void {
    // Reset any existing color
    this.renderer.setStyle(this.el.nativeElement, 'color', null);
    
    // Apply new color based on class
    switch (this.appClasseVol) {
      case 'BUSINESS':
        this.renderer.setStyle(this.el.nativeElement, 'color', '#ff0000');
        break;
      case 'PREMIUM':
        this.renderer.setStyle(this.el.nativeElement, 'color', '#00ff00');
        break;
      case 'STANDARD':
        this.renderer.setStyle(this.el.nativeElement, 'color', '#0000ff');
        break;
    }
  }
}
