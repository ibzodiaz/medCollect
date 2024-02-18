import { Component } from '@angular/core';

@Component({
  selector: 'app-paracliniques',
  templateUrl: './paracliniques.component.html',
  styleUrls: ['./paracliniques.component.css']
})
export class ParacliniquesComponent {
  constructor() {}

  telecoeurCanceled:boolean = false;
  ecgCanceled:boolean = false;
  ettCanceled:boolean = false;
  modaliteEvolutiveCanceled:boolean = false;

  ngOnInit(): void {}

  checkboxState($event: boolean){
    this.telecoeurCanceled = $event;
    this.ecgCanceled = $event;
    this.ettCanceled = $event;
    this.modaliteEvolutiveCanceled = $event;

    const telecoeurPresent = document.getElementById("telecoeurPresent") as HTMLInputElement;
    const ecgPresent = document.getElementById("ecgPresent") as HTMLInputElement;
    const ettPresent = document.getElementById("ettPresent") as HTMLInputElement;
    const modaliteEvolutive = document.getElementById("modaliteEvolutive") as HTMLInputElement;

    if(this.telecoeurCanceled){
      telecoeurPresent.checked = false;
    }

    if(this.ecgCanceled){
      ecgPresent.checked = false;
    }

    if(this.ettCanceled){
      ettPresent.checked = false;
    }

    if(this.modaliteEvolutiveCanceled){
      modaliteEvolutive.checked = false;
    }
  }

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

}
