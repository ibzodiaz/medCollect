import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-telecoeur',
  templateUrl: './telecoeur.component.html',
  styleUrls: ['./telecoeur.component.css']
})
export class TelecoeurComponent {

  telecoeurCanceled: boolean = false;
  
  @Output() emittedEvent =  new EventEmitter<boolean>();

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      this.telecoeurCanceled = true;
      this.emittedEvent.emit(this.telecoeurCanceled);
    }
  }
}
