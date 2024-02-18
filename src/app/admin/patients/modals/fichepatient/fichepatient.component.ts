import { Component } from '@angular/core';

@Component({
  selector: 'app-fichepatient',
  templateUrl: './fichepatient.component.html',
  styleUrls: ['./fichepatient.component.css']
})
export class FichepatientComponent {
  constructor() {}

  ngOnInit(): void {}

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  onDocumentClick(event: MouseEvent): void {
    const modalIds = ["modal1", "modal2", "modal3", "modal4", "modal5"];

    for (const modalId of modalIds) {
      const modal = document.getElementById(modalId);

      if (modal && event.target === modal) {
        modal.style.display = "none";
        break;
      }
    }
  }
}
