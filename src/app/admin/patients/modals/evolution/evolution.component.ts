import { Component } from '@angular/core';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent {

  constructor() {}

  womenCanceled:boolean = false;
  babiesCanceled:boolean = false;

  ngOnInit(): void {}

  checkboxState($event: boolean){
    this.womenCanceled = $event;
    this.babiesCanceled = $event;

    const women = document.getElementById("women") as HTMLInputElement;
    const baby = document.getElementById("baby") as HTMLInputElement;

    if(this.womenCanceled){
      women.checked = false;
    }

    if(this.babiesCanceled){
      baby.checked = false;
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
