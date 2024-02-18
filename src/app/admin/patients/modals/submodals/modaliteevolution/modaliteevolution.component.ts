import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modaliteevolution',
  templateUrl: './modaliteevolution.component.html',
  styleUrls: ['./modaliteevolution.component.css']
})
export class ModaliteevolutionComponent {
  modaliteEvolutiveCanceled: boolean = false;
  
  @Output() emittedEvent =  new EventEmitter<boolean>();

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      this.modaliteEvolutiveCanceled = true;
      this.emittedEvent.emit(this.modaliteEvolutiveCanceled);
    }
  }

  
  selectedOptions: string[] = [];

  onCheckboxChange(event: any) {
    const optionValue = event.target.value;
    
    if (event.target.checked) {
      this.selectedOptions.push(optionValue);
    } else {
      const index = this.selectedOptions.indexOf(optionValue);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
      }
    }
  }
}
