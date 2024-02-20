import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent {

  constructor() {}

  options:String[] =  ['Récupération totale', 'Récupération partielle','État stationnaire', 'Dégradation de la qualité de vie'];

  decesCanceled:boolean = false;

  womenForm:any = {
    patientId: '',
    evolutionApresSortie: '',
    classeNYHA: '',
    detailsDeces: {
       date: '',
       causes: '',
       lieu: ''
    },
    bonneObservanceTherapeutique: false,
    nombreRehospitalisations: 0,
    facteursDecompensation: {
      anemie: false,
      infectionsVirales: false,
      infectionsBacteriennes: false,
      denutrition: false,
      rupturesTherapeutiques: false
    },
    echocardiographie: {
      DTDVG: '',
      DTSVG: '',
      FEVG: '',
      FR: '', 
      e: '',
      a: '',
      td: '',
      ee: '',
      tapse: '',
      dtog:''
    },
    biologie: {
      hemoglobinemie: 0,
      gb: 0,
      plaquettes: 0,
      vgm: 0,
      ccmh: 0,
      tcmh: 0,
      crp: 0,
      uree: 0,
      creatininemie: 0,
      ntProBNP: 0,
      prolactine: 0
    }
  }

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
