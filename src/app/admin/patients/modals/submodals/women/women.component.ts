import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent {

  constructor() {}

  decesCanceled:boolean = false;

  ngOnInit(): void {}

  checkboxState($event: boolean){
    this.decesCanceled = $event;

    const deces = document.getElementById("deces") as HTMLInputElement;

    if(this.decesCanceled){
      deces.checked = false;
    }

  }

  womenCanceled: boolean = false;
  
  @Output() emittedEvent =  new EventEmitter<boolean>();

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      this.womenCanceled = true;
      this.emittedEvent.emit(this.womenCanceled);
    }
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";

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
