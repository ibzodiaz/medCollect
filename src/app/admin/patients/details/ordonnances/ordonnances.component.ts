import { Component } from '@angular/core';

@Component({
  selector: 'app-ordonnances',
  templateUrl: './ordonnances.component.html',
  styleUrls: ['./ordonnances.component.css']
})
export class OrdonnancesComponent {

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      
    }
  }
}
