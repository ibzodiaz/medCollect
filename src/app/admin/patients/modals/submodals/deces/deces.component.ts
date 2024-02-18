import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-deces',
  templateUrl: './deces.component.html',
  styleUrls: ['./deces.component.css']
})
export class DecesComponent {
  decesCanceled: boolean = false;
  
  @Output() emittedEvent =  new EventEmitter<boolean>();

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      this.decesCanceled = true;
      this.emittedEvent.emit(this.decesCanceled);
    }
  }

}
