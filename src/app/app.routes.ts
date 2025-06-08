import { Routes } from '@angular/router';
import { ViewAirFranceComponent } from './components/view-airfrance/view-airfrance.component';

export const routes: Routes = [
  {
    path: 'decollages', component: ViewAirFranceComponent, data: { type: 'depart' }
  },
  {
    path: 'atterrissages', component: ViewAirFranceComponent, data: { type: 'arrive' }
  },
  {
    path: '**', redirectTo: 'decollages'
  }
];
